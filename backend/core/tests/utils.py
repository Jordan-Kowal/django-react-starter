import os
import shutil
from typing import TYPE_CHECKING

from django.conf import settings
from jklib.dj.tests import APITestCase, ImprovedTestCase

from user.tests.factories import UserFactory

if TYPE_CHECKING:
    from user.models import User as UserType


class BaseTestCase(ImprovedTestCase):
    user: "UserType"

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
        cls.user = UserFactory()

    def setUp(self) -> None:
        super().setUp()
        self.api_client.force_authenticate(self.user)

    def tearDown(self) -> None:
        super().tearDown()
        self.api_client.logout()
