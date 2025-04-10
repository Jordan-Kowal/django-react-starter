from typing import TYPE_CHECKING

from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django_utils_kit.emails import Email

if TYPE_CHECKING:
    from user.models import User as UserType

PASSWORD_RESET_EMAIL = Email(
    default_subject="Django React Starter - Password Reset",
    template_path="authentication/password_reset_email.html",
)


def send_password_reset_email(user: "UserType") -> None:
    token = PasswordResetTokenGenerator().make_token(user)
    url = f"{settings.SITE_DOMAIN}/password-reset-confirm/{user.pk}/{token}"  # type: ignore
    duration_minute = int(settings.PASSWORD_RESET_TIMEOUT / 60)
    PASSWORD_RESET_EMAIL.send_async(
        to=[user.email],
        context={"password_reset_url": url, "expiration_time": duration_minute},
    )
