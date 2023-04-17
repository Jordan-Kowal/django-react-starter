# Built-in
from typing import TYPE_CHECKING

# Third-party
from jklib.dj.tests import APITestCase, ImprovedTestCase

# Application
from user.tests.factories import UserFactory

if TYPE_CHECKING:
    # Application
    from user.models import User as UserType


class BaseTestCase(ImprovedTestCase):
    user: "UserType"


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
