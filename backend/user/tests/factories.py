from typing import Any

from django.contrib.auth import get_user_model
from factory import Sequence, post_generation
from factory.django import DjangoModelFactory

User = get_user_model()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        exclude = ("is_staff", "is_superuser")

    username = Sequence(lambda x: f"username{x}")
    email = Sequence(lambda x: f"fake-email-{x}@fake-domain.com")
    password = Sequence(lambda x: f"Str0ngP4ssw0rd!{x}")
    first_name = Sequence(lambda x: f"Firstname{x}")
    last_name = Sequence(lambda x: f"Lastname{x}")
    is_staff = False
    is_superuser = False

    @post_generation
    def set_user_password(self, create: bool, extracted: str, **kwargs: Any) -> None:
        self.set_password(self.password)
        self.save()

    @post_generation
    def resource_id(self, create: bool, extracted: str, **kwargs: Any) -> None:
        if create and extracted:
            self.profile.resource_id = extracted
            self.profile.save()


class AdminFactory(UserFactory):
    class Meta:
        model = User
        exclude = ("is_superuser",)

    is_staff = True


class SuperUserFactory(UserFactory):
    class Meta:
        model = User

    is_staff = True
    is_superuser = True
