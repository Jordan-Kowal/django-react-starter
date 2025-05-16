from django.apps import AppConfig


class UserConfig(AppConfig):
    name = "user"

    def ready(self) -> None:
        from django.conf import settings

        from user.indexers import UserIndexer

        if settings.ENVIRONMENT == "test":
            return

        UserIndexer.maybe_create_index()  # pragma: no cover
