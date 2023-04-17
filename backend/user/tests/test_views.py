# Django
from django.contrib.auth import get_user_model

# Application
from core.tests import BaseActionTestCase
from django_react_starter.urls import API_V1
from user.tests.factories import UserFactory

User = get_user_model()


class AuthViewSetTestCase(BaseActionTestCase):
    viewset_url = f"/{API_V1}auth/"

    def test_check_success(self) -> None:
        url = self.build_url(extra_path="check")
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 204)

    def test_check_error(self) -> None:
        url = self.build_url(extra_path="check")
        self.api_client.logout()
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 401)

    def test_login_success(self) -> None:
        self.api_client.logout()
        url = self.build_url(extra_path="login")
        user = UserFactory(email="test@test.test", password="test")
        payload = {"email": user.email, "password": "test"}
        response = self.api_client.post(url, data=payload)
        self.assertEqual(response.status_code, 204)
        user.refresh_from_db()
        self.assertTrue(user.is_authenticated)

    def test_login_error(self) -> None:
        self.api_client.logout()
        url = self.build_url(extra_path="login")
        user = UserFactory(email="test@test.test", password="test")
        # Invalid password
        payload = {"email": user.email, "password": "invalid password"}
        response = self.api_client.post(url, data=payload)
        self.assertEqual(response.status_code, 400)
        # Invalid email
        payload = {"email": "invalid@email.com", "password": "test"}
        response = self.api_client.post(url, data=payload)
        self.assertEqual(response.status_code, 400)
        # Inactive user
        user.is_active = False
        user.save()
        payload = {"email": user.email, "password": "test"}
        response = self.api_client.post(url, data=payload)
        self.assertEqual(response.status_code, 400)

    def test_logout_success(self) -> None:
        self.assertTrue(self.user.is_authenticated)
        url = self.build_url(extra_path="logout")
        response = self.api_client.post(url)
        self.assertEqual(response.status_code, 204)


class CurrentUserViewSetTestCase(BaseActionTestCase):
    viewset_url = f"/{API_V1}self/"

    def test_create_success(self) -> None:
        self.user.profile.subscribed_to_notifications = False
        self.user.profile.save()
        payload = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@johndoe.com",
        }
        response = self.api_client.post(self.viewset_url, data=payload)
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.pk, response.data["id"])
        self.assertEqual(self.user.first_name, payload["first_name"])
        self.assertEqual(self.user.last_name, payload["last_name"])
        self.assertEqual(self.user.email, payload["email"])

    def test_list_success(self) -> None:
        response = self.api_client.get(self.viewset_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["id"], self.user.pk)

    def test_update_password_error(self) -> None:
        url = self.build_url(extra_path="update_password")
        current_password = "stR0ngP4ssw0rd!"
        self.user.set_password(current_password)
        self.user.save()
        new_password = f"{current_password}++"
        # Invalid current password
        payload = {
            "current_password": "invalid password",
            "password": new_password,
            "confirm_password": new_password,
        }
        response = self.api_client.post(url, payload)
        self.assertEqual(response.status_code, 400)
        # Not strong-enough password
        payload = {
            "current_password": current_password,
            "password": "weak",
            "confirm_password": "weak",
        }
        response = self.api_client.post(url, payload)
        self.assertEqual(response.status_code, 400)
        # Passwords do not match
        payload = {
            "current_password": current_password,
            "password": new_password,
            "confirm_password": "weak",
        }
        response = self.api_client.post(url, payload)
        self.assertEqual(response.status_code, 400)

    def test_update_password_success(self) -> None:
        url = self.build_url(extra_path="update_password")
        current_password = "stR0ngP4ssw0rd!"
        self.user.set_password(current_password)
        self.user.save()
        new_password = f"{current_password}a"
        payload = {
            "current_password": current_password,
            "password": new_password,
            "confirm_password": new_password,
        }
        response = self.api_client.post(url, data=payload)
        self.user.refresh_from_db()
        self.assertEqual(response.status_code, 204)
        self.assertFalse(self.user.check_password(current_password))
        self.assertTrue(self.user.check_password(new_password))
