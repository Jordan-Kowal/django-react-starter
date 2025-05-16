from typing import TYPE_CHECKING

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import override_settings

from core.tests import BaseTestCase

if TYPE_CHECKING:
    from user.models import User as UserType

User: "UserType" = get_user_model()


class CreateSUCommandTestCase(BaseTestCase):
    @override_settings(
        DJANGO_SUPERUSER_EMAIL="random-email@for-test.com",
        DJANGO_SUPERUSER_PASSWORD="random-password-for-test",
    )
    def test_createsu(self) -> None:
        self.assertEqual(User.objects.count(), 0)
        # Create superuser using env variables
        call_command("createsu")
        self.assertEqual(User.objects.count(), 1)
        user = User.objects.get(username="random-email@for-test.com")
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
        # Check we cannot create/update it again using the same command
        user.is_staff = False
        user.save()
        call_command("createsu")
        user.refresh_from_db()
        self.assertEqual(User.objects.count(), 1)
        self.assertTrue(user.is_superuser)
        self.assertFalse(user.is_staff)

    @override_settings(DJANGO_SUPERUSER_EMAIL="", DJANGO_SUPERUSER_PASSWORD="")
    def test_createsu_no_env_variables(self) -> None:
        self.assertEqual(User.objects.count(), 0)
        # Fails to create SU
        call_command("createsu")
        self.assertEqual(User.objects.count(), 0)
