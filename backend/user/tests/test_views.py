from django.contrib.auth import get_user_model
from rest_framework.reverse import reverse

from core.tests import BaseActionTestCase

User = get_user_model()

SELF_ACCOUNT_URL = reverse("self-account")
UPDATE_PASSWORD_URL = reverse("self-password")


class CurrentUserViewSetTestCase(BaseActionTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.api_client.force_authenticate(self.user)

    def test_put_account_success(self) -> None:
        self.user.profile.subscribed_to_notifications = False
        self.user.profile.save()
        payload = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@johndoe.com",
        }
        response = self.api_client.put(SELF_ACCOUNT_URL, data=payload)
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.pk, response.data["id"])
        self.assertEqual(self.user.first_name, payload["first_name"])
        self.assertEqual(self.user.last_name, payload["last_name"])
        self.assertEqual(self.user.email, payload["email"])

    def test_put_account_error_if_not_authenticated(self) -> None:
        self.api_client.logout()
        response = self.api_client.put(SELF_ACCOUNT_URL, data={})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.data["detail"], "Authentication credentials were not provided."
        )

    def test_get_account_success(self) -> None:
        response = self.api_client.get(SELF_ACCOUNT_URL)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["id"], self.user.pk)

    def test_get_account_error_if_not_authenticated(self) -> None:
        self.api_client.logout()
        response = self.api_client.get(SELF_ACCOUNT_URL)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.data["detail"], "Authentication credentials were not provided."
        )

    def test_delete_account_success(self) -> None:
        user_id = self.user.id
        initial_user_count = User.objects.count()
        response = self.api_client.delete(SELF_ACCOUNT_URL)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(User.objects.count(), initial_user_count - 1)
        self.assertFalse(User.objects.filter(id=user_id).exists())

    def test_delete_account_error_if_not_authenticated(self) -> None:
        self.api_client.logout()
        initial_user_count = User.objects.count()
        response = self.api_client.delete(SELF_ACCOUNT_URL)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.data["detail"], "Authentication credentials were not provided."
        )
        self.assertEqual(User.objects.count(), initial_user_count)

    def test_account_does_not_allow_post(self) -> None:
        response = self.api_client.post(SELF_ACCOUNT_URL, data={})
        self.assertEqual(response.status_code, 405)

    def test_put_password_success(self) -> None:
        current_password = "stR0ngP4ssw0rd!"
        self.user.set_password(current_password)
        self.user.save()
        new_password = f"{current_password}a"
        payload = {
            "current_password": current_password,
            "new_password": new_password,
        }
        response = self.api_client.put(UPDATE_PASSWORD_URL, data=payload)
        self.user.refresh_from_db()
        self.assertEqual(response.status_code, 204)
        self.assertFalse(self.user.check_password(current_password))
        self.assertTrue(self.user.check_password(new_password))

    def test_put_password_error_if_invalid_current_password(self) -> None:
        current_password = "stR0ngP4ssw0rd!"
        self.user.set_password(current_password)
        self.user.save()
        new_password = f"{current_password}++"
        payload = {
            "current_password": "invalid password",
            "new_password": new_password,
        }
        response = self.api_client.put(UPDATE_PASSWORD_URL, payload)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["current_password"][0], "Current password is incorrect"
        )

    def test_put_password_error_if_weak_password(self) -> None:
        current_password = "stR0ngP4ssw0rd!"
        self.user.set_password(current_password)
        self.user.save()
        payload = {
            "current_password": current_password,
            "new_password": "weak",
        }
        response = self.api_client.put(UPDATE_PASSWORD_URL, payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("new_password", response.data)
        self.assertTrue(
            any(
                "password is too short" in error.lower()
                for error in response.data["new_password"]
            )
        )

    def test_put_password_error_if_not_authenticated(self) -> None:
        self.api_client.logout()
        response = self.api_client.put(UPDATE_PASSWORD_URL, {})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.data["detail"], "Authentication credentials were not provided."
        )
