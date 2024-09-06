import logging
from typing import Any

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django_prometheus.models import ExportModelOperationsMixin

LOGGER = logging.getLogger("default")


class User(ExportModelOperationsMixin("user"), AbstractUser):  # type: ignore
    profile: "Profile"

    email = models.EmailField(unique=True, null=False, blank=False)

    def save(self, *args: Any, **kwargs: Any) -> None:
        created = self.pk is None
        if self.username != self.email:
            self.username = self.email
        super().save(*args, **kwargs)
        if created:
            Profile.objects.create(user=self)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.email

    @property
    def indexed_name(self) -> str:
        return f"user_{self.id}"


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
        primary_key=True,
    )

    class Meta:
        ordering = ["user"]

    def __str__(self) -> str:
        return f"Profile of {self.user.email}"
