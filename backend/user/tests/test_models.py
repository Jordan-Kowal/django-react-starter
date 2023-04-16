# Built-in
from datetime import date
from typing import TYPE_CHECKING

# Django
from django.contrib.auth import get_user_model

# Application
from core.tests import BaseTestCase
from user.models import Profile
from user.tests.factories import UserFactory

if TYPE_CHECKING:
    # Application
    from user.models import User as UserType

User: "UserType" = get_user_model()  # type: ignore

TODAY = date.today()


class UserTestCase(BaseTestCase):
    def test_signal_create_profile(self) -> None:
        user = UserFactory()
        self.assertEqual(Profile.objects.count(), 1)
        profile = Profile.objects.first()
        self.assertEqual(user.profile, profile)
        self.assertEqual(profile.user, user)

    def test_save_user(self) -> None:
        user = UserFactory()
        email = "random-email@random-domain.com"
        user.email = email
        user.save()
        # Check email is maintained and username is changed
        self.assertEqual(user.email, email)
        self.assertEqual(user.email, user.username)
        # Check that you cannot change the username
        user.username = "New username"
        user.save()
        self.assertEqual(user.email, email)
        self.assertEqual(user.email, user.username)


class ProfileTestCase(BaseTestCase):
    pass
