from django.contrib.auth import get_user_model
from rest_framework.reverse import reverse

from core.tests import BaseActionTestCase
from user.tests.factories import UserFactory

User = get_user_model()

AUTH_CHECK_URL = reverse("auth-check")
AUTH_LOGIN_URL = reverse("auth-login")
AUTH_LOGOUT_URL = reverse("auth-logout")
AUTH_REGISTER_URL = reverse("auth-register")


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

    def test_login_error_if_invalid_email(self) -> None:
        payload = {"email": "invalid@email.com", "password": "test"}
        response = self.api_client.post(AUTH_LOGIN_URL, data=payload)
        self.assertEqual(response.status_code, 400)

    def test_login_error_if_inactive_user(self) -> None:
        user = UserFactory(email="test@test.test", password="test", is_active=False)
        payload = {"email": user.email, "password": "test"}
        response = self.api_client.post(AUTH_LOGIN_URL, data=payload)
        self.assertEqual(response.status_code, 400)

    def test_login_error_if_authenticated(self) -> None:
        self.api_client.force_authenticate(self.user)
        response = self.api_client.post(AUTH_LOGIN_URL, data={})
        self.assertEqual(response.status_code, 403)

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

    def test_register_error_if_weak_password(self) -> None:
        payload = {
            "email": "newuser@example.com",
            "password": "weak",
        }
        initial_user_count = User.objects.count()
        response = self.api_client.post(AUTH_REGISTER_URL, data=payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), initial_user_count)

    def test_register_error_if_authenticated(self) -> None:
        self.api_client.force_authenticate(self.user)
        response = self.api_client.post(AUTH_REGISTER_URL, data={})
        self.assertEqual(response.status_code, 403)


SELF_URL = reverse("self-list")
UPDATE_PASSWORD_URL = reverse("self-update-password")


class CurrentUserViewSetTestCase(BaseActionTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.api_client.force_authenticate(self.user)

    def test_create_success(self) -> None:
        self.user.profile.subscribed_to_notifications = False
        self.user.profile.save()
        payload = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@johndoe.com",
        }
        response = self.api_client.post(SELF_URL, data=payload)
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.pk, response.data["id"])
        self.assertEqual(self.user.first_name, payload["first_name"])
        self.assertEqual(self.user.last_name, payload["last_name"])
        self.assertEqual(self.user.email, payload["email"])

    def test_create_error_if_not_authenticated(self) -> None:
        self.api_client.force_authenticate(None)
        response = self.api_client.post(SELF_URL, data={})
        self.assertEqual(response.status_code, 401)

    def test_list_success(self) -> None:
        response = self.api_client.get(SELF_URL)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["id"], self.user.pk)

    def test_list_error_if_not_authenticated(self) -> None:
        self.api_client.force_authenticate(None)
        response = self.api_client.get(SELF_URL)
        self.assertEqual(response.status_code, 401)

    def test_update_password_success(self) -> None:
        current_password = "stR0ngP4ssw0rd!"
        self.user.set_password(current_password)
        self.user.save()
        new_password = f"{current_password}a"
        payload = {
            "current_password": current_password,
            "new_password": new_password,
        }
        response = self.api_client.post(UPDATE_PASSWORD_URL, data=payload)
        self.user.refresh_from_db()
        self.assertEqual(response.status_code, 204)
        self.assertFalse(self.user.check_password(current_password))
        self.assertTrue(self.user.check_password(new_password))

    def test_update_password_error_if_invalid_current_password(self) -> None:
        current_password = "stR0ngP4ssw0rd!"
        self.user.set_password(current_password)
        self.user.save()
        new_password = f"{current_password}++"
        payload = {
            "current_password": "invalid password",
            "new_password": new_password,
        }
        response = self.api_client.post(UPDATE_PASSWORD_URL, payload)
        self.assertEqual(response.status_code, 400)

    def test_update_password_error_if_weak_password(self) -> None:
        current_password = "stR0ngP4ssw0rd!"
        self.user.set_password(current_password)
        self.user.save()
        payload = {
            "current_password": current_password,
            "new_password": "weak",
        }
        response = self.api_client.post(UPDATE_PASSWORD_URL, payload)
        self.assertEqual(response.status_code, 400)

    def test_update_password_error_if_not_authenticated(self) -> None:
        response = self.api_client.post(UPDATE_PASSWORD_URL, {})
        self.assertEqual(response.status_code, 401)
