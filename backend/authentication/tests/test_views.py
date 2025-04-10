from time import sleep

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core import mail
from rest_framework.reverse import reverse

from core.tests import BaseActionTestCase
from user.tests.factories import UserFactory

User = get_user_model()

AUTH_CHECK_URL = reverse("auth-check")
AUTH_LOGIN_URL = reverse("auth-login")
AUTH_LOGOUT_URL = reverse("auth-logout")
AUTH_REGISTER_URL = reverse("auth-register")
AUTH_PASSWORD_RESET_URL = reverse("auth-password-reset")
AUTH_PASSWORD_RESET_CONFIRM_URL = reverse("auth-password-reset-confirm")


class AuthViewSetTestCase(BaseActionTestCase):
    def setUp(self) -> None:
        super().setUp()

    def test_check_success(self) -> None:
        self.api_client.force_authenticate(self.user)
        response = self.api_client.get(AUTH_CHECK_URL)
        self.assertEqual(response.status_code, 204)

    def test_check_error_if_not_authenticated(self) -> None:
        response = self.api_client.get(AUTH_CHECK_URL)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.data["detail"], "Authentication credentials were not provided."
        )

    def test_login_success(self) -> None:
        user = UserFactory(email="test@test.test", password="test")
        payload = {"email": user.email, "password": "test"}
        response = self.api_client.post(AUTH_LOGIN_URL, data=payload)
        self.assertEqual(response.status_code, 204)
        user.refresh_from_db()
        self.assertTrue(user.is_authenticated)

    def test_login_error_if_invalid_password(self) -> None:
        user = UserFactory(email="test@test.test", password="test")
        payload = {"email": user.email, "password": "invalid password"}
        response = self.api_client.post(AUTH_LOGIN_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["non_field_errors"][0], "Invalid credentials")

    def test_login_error_if_invalid_email(self) -> None:
        payload = {"email": "invalid@email.com", "password": "test"}
        response = self.api_client.post(AUTH_LOGIN_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["non_field_errors"][0], "Invalid credentials")

    def test_login_error_if_inactive_user(self) -> None:
        user = UserFactory(email="test@test.test", password="test", is_active=False)
        payload = {"email": user.email, "password": "test"}
        response = self.api_client.post(AUTH_LOGIN_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["non_field_errors"][0], "Your account is inactive"
        )

    def test_login_error_if_authenticated(self) -> None:
        self.api_client.force_authenticate(self.user)
        response = self.api_client.post(AUTH_LOGIN_URL, data={})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            response.data["detail"],
            "You must be logged out to use this service",
        )

    def test_logout_success(self) -> None:
        self.api_client.force_authenticate(self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.api_client.post(AUTH_LOGOUT_URL)
        self.assertEqual(response.status_code, 204)
        # self.user.refresh_from_db()
        # self.assertFalse(self.user.is_authenticated)

    def test_logout_error_if_not_authenticated(self) -> None:
        response = self.api_client.post(AUTH_LOGOUT_URL)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.data["detail"], "Authentication credentials were not provided."
        )

    def test_register_success(self) -> None:
        payload = {
            "email": "newuser@example.com",
            "password": "stR0ngP4ssw0rd!",
        }
        initial_user_count = User.objects.count()
        response = self.api_client.post(AUTH_REGISTER_URL, data=payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), initial_user_count + 1)
        user = User.objects.get(email=payload["email"])
        self.assertTrue(user.check_password(payload["password"]))
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_authenticated)

    def test_register_error_if_email_taken(self) -> None:
        existing_user = UserFactory(email="existing@example.com")
        payload = {
            "email": existing_user.email,
            "password": "stR0ngP4ssw0rd!",
        }
        initial_user_count = User.objects.count()
        response = self.api_client.post(AUTH_REGISTER_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), initial_user_count)
        self.assertEqual(response.data["email"][0], "This email is already used")

    def test_register_error_if_weak_password(self) -> None:
        payload = {
            "email": "newuser@example.com",
            "password": "weak",
        }
        initial_user_count = User.objects.count()
        response = self.api_client.post(AUTH_REGISTER_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), initial_user_count)
        self.assertIn("password", response.data)
        self.assertTrue(
            any(
                "password is too short" in error.lower()
                for error in response.data["password"]
            )
        )

    def test_register_error_if_authenticated(self) -> None:
        self.api_client.force_authenticate(self.user)
        response = self.api_client.post(AUTH_REGISTER_URL, data={})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            response.data["detail"],
            "You must be logged out to use this service",
        )

    def test_password_reset_with_valid_email(self) -> None:
        user = UserFactory(email="reset@test.com")
        payload = {"email": user.email}
        response = self.api_client.post(AUTH_PASSWORD_RESET_URL, data=payload)
        self.assertEqual(response.status_code, 204)
        sleep(0.1)  # Email is sent asynchronously
        self.assertEqual(len(mail.outbox), 1)

    def test_password_reset_with_invalid_email(self) -> None:
        payload = {"email": "nonexistent@test.com"}
        response = self.api_client.post(AUTH_PASSWORD_RESET_URL, data=payload)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(mail.outbox), 0)

    def test_password_reset_confirm_with_valid_token(self) -> None:
        user = UserFactory(email="reset_confirm@test.com", password="oldpassword")
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)  # type: ignore
        payload = {
            "uid": user.id,
            "token": token,
            "password": "NewSecurePassword123!",
        }
        response = self.api_client.post(AUTH_PASSWORD_RESET_CONFIRM_URL, data=payload)
        self.assertEqual(response.status_code, 204)
        # Verify password was changed
        user.refresh_from_db()
        self.assertTrue(user.check_password("NewSecurePassword123!"))

    def test_password_reset_confirm_with_invalid_token(self) -> None:
        user = UserFactory(email="reset_invalid@test.com", password="oldpassword")
        payload = {
            "uid": user.id,
            "token": "invalid-token",
            "password": "NewSecurePassword123!",
        }
        response = self.api_client.post(AUTH_PASSWORD_RESET_CONFIRM_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["non_field_errors"][0], "Invalid information")
        # Verify password was not changed
        user.refresh_from_db()
        self.assertTrue(user.check_password("oldpassword"))

    def test_password_reset_confirm_with_invalid_user(self) -> None:
        payload = {
            "uid": 9999,  # non-existent user ID
            "token": "some-token",
            "password": "NewSecurePassword123!",
        }
        response = self.api_client.post(AUTH_PASSWORD_RESET_CONFIRM_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["non_field_errors"][0], "Invalid information")

    def test_password_reset_confirm_with_weak_password(self) -> None:
        user = UserFactory(email="reset_weak@test.com", password="oldpassword")
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)  # type: ignore
        payload = {"uid": user.id, "token": token, "password": "weak"}
        response = self.api_client.post(AUTH_PASSWORD_RESET_CONFIRM_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["password"][0],
            "This password is too short. It must contain at least 8 characters.",
        )
        # Verify password was not changed
        user.refresh_from_db()
        self.assertTrue(user.check_password("oldpassword"))
