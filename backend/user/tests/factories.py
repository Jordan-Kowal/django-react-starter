# Built-in
from typing import Any

# Third-party
import factory

# Django
from django.contrib.auth import get_user_model

User = get_user_model()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
        exclude = ("is_staff", "is_superuser")

    username = factory.Sequence(lambda x: f"username{x}")
    email = factory.Sequence(lambda x: f"fake-email-{x}@fake-domain.com")
    password = factory.Sequence(lambda x: f"Str0ngP4ssw0rd!{x}")
    first_name = factory.Sequence(lambda x: f"Firstname{x}")
    last_name = factory.Sequence(lambda x: f"Lastname{x}")
    is_staff = False
    is_superuser = False

    @factory.post_generation
    def set_user_password(self, create: bool, extracted: str, **kwargs: Any) -> None:
        self.set_password(self.password)
        self.save()

    @factory.post_generation
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
