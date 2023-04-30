# Built-in
from typing import Any

# Django
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management import BaseCommand

User = get_user_model()


class Command(BaseCommand):
    help = "Create the default superuser using env variables"

    def handle(self, *args: Any, **options: Any) -> None:
        email = settings.DJANGO_SUPERUSER_EMAIL
        password = settings.DJANGO_SUPERUSER_PASSWORD
        if not email or not password:
            print("Please specify DJANGO_SUPERUSER_EMAIL and DJANGO_SUPERUSER_PASSWORD")
            return
        if User.objects.filter(email=email).exists():
            print(f"Superuser '{email}' already exists")
        else:
            User.objects.create_superuser(email, email, password)
            print(f"Superuser '{email}' successfully created")
