from datetime import date
from typing import TYPE_CHECKING, cast

from django.contrib.auth import get_user_model

from core.tests import BaseTestCase
from user.models import Profile
from user.tests.factories import UserFactory

if TYPE_CHECKING:
    from user.models import User as UserType

User: "UserType" = get_user_model()  # type: ignore

TODAY = date.today()


class UserTestCase(BaseTestCase):
    def test_str(self) -> None:
        user = UserFactory(email="fake-email@fake-domain.org")
        self.assertEqual(str(user), "fake-email@fake-domain.org")

    def test_save_create_profile(self) -> None:
        user = UserFactory()
        self.assertEqual(Profile.objects.count(), 1)
        profile = Profile.objects.first()
        self.assertEqual(user.profile, profile)
        self.assertEqual(profile.user, user)

    def test_save_email_override(self) -> None:
        user = cast(UserType, UserFactory())
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

    def test_index_name(self) -> None:
        user = UserFactory()
        self.assertEqual(user.indexed_name, f"user_{user.id}")


class ProfileTestCase(BaseTestCase):
    def test_str(self) -> None:
        user = UserFactory(email="fake-email@fake-domain.org")
        self.assertEqual(str(user.profile), "Profile of fake-email@fake-domain.org")
