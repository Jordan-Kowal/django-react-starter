from jklib.meili.dj.test_utils import IndexerBaseTestMixin

from core.tests import BaseTestCase
from user.indexers import UserIndexer
from user.models import User
from user.tests.factories import UserFactory


class UserIndexerTestCase(IndexerBaseTestMixin[User], BaseTestCase):
    indexer_class = UserIndexer
    search_attribute = "indexed_name"

    @classmethod
    def setUpTestData(cls) -> None:
        cls.item_1 = UserFactory()
        cls.item_2 = UserFactory()

    def test_build_object(self) -> None:
        user = UserFactory()
        self.assertEqual(
            self.indexer_class.build_object(user),
            {
                "id": user.id,
                "indexed_name": f"user_{user.id}",
                "fake_type": 1,
            },
        )
