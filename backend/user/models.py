# Built-in
import logging
from typing import Any

# Third-party
from jklib.dj.managers import NoBulkManager

# Django
from django.conf import settings
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

LOGGER = logging.getLogger("default")


class CustomUserManager(NoBulkManager, UserManager):
    pass


class User(AbstractUser):
    profile: "Profile"

    email = models.EmailField(unique=True, null=False, blank=False)

    objects = CustomUserManager()

    def save(self, *args: Any, **kwargs: Any) -> None:
        if self.username != self.email:  # type: ignore
            self.username = self.email
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
        primary_key=True,
    )

    objects: models.Manager = NoBulkManager()

    class Meta:
        ordering = ["user"]

    def __str__(self) -> str:
        return f"Profile of {self.user.email}"
