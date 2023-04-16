# Django
from django.apps import AppConfig


class UserConfig(AppConfig):
    name = "user"

    def ready(self) -> None:
        # Application
        import user.signals  # noqa: F401
