# Built-in
from typing import TYPE_CHECKING

# Django
from django.contrib.auth import get_user_model
from django.core.management import call_command

# Application
from core.tests import BaseTestCase

if TYPE_CHECKING:
    # Application
    from user.models import User as UserType


User: "UserType" = get_user_model()  # type: ignore


class CreateSUCommandTestCase(BaseTestCase):
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
