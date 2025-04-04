import os
import shutil
from typing import cast
from unittest.mock import patch

from django.conf import settings
from django_utils_kit.test_utils import APITestCase, ImprovedTestCase
from meilisearch import Client

from user.models import User as UserType
from user.tests.factories import UserFactory


class BaseTestCase(ImprovedTestCase):
    user: "UserType"
    meilisearch_client: Client

    @classmethod
    def setUpClass(cls) -> None:
        super().setUpClass()
        cls.meilisearch_client = Client(
            settings.MEILISEARCH_HOST, settings.MEILISEARCH_API_KEY
        )

    def setUp(self) -> None:
        super().setUp()
        self._mock_celery_tasks()

    def _mock_celery_tasks(self) -> None:
        """
        Patches the celery tasks in both forms: `delay` and `apply_async`.
        """
        names = [
            # Delay
            "user.tasks.index_all_users_atomically.delay",
            "user.tasks.index_users.delay",
            "user.tasks.unindex_users.delay",
            # Apply Async
            "user.tasks.index_all_users_atomically.apply_async",
            "user.tasks.index_users.apply_async",
            "user.tasks.unindex_users.apply_async",
        ]
        self.celery_task_mocks = {name: patch(name).start() for name in names}

    @classmethod
    def tearDownClass(cls) -> None:
        super().tearDownClass()
        media_root = settings.MEDIA_ROOT or ""
        if os.path.exists(media_root) and media_root.endswith("test"):
            shutil.rmtree(media_root)


class BaseActionTestCase(BaseTestCase, APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        super().setUpTestData()
        cls.user = cast(UserType, UserFactory())

    def tearDown(self) -> None:
        super().tearDown()
        self.api_client.logout()
