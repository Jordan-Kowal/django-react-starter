# Built-in
from typing import TYPE_CHECKING, Dict, Type

# Django
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

# Application
from user.models import Profile

if TYPE_CHECKING:
    # Application
    from user.models import User as UserType

User = get_user_model()


@receiver(post_save, sender=User)
def create_profile(
    sender: Type["UserType"], instance: "UserType", created: bool, **kwargs: Dict
) -> None:
    if created:
        Profile.objects.create(user=instance)
