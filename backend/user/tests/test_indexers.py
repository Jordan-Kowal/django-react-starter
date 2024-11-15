from core.tests import BaseTestCase
from user.indexers import UserIndexer
from user.tests.factories import UserFactory


class UserIndexerTestCase(BaseTestCase):
    indexer_class = UserIndexer

    @classmethod
    def setUpTestData(cls) -> None:
        cls.item_1 = UserFactory()
        cls.item_2 = UserFactory()

    def test_build_object(self) -> None:
        user = UserFactory()
        self.assertEqual(
            UserIndexer.build_object(user),
            {
                "id": user.id,
                "indexed_name": f"user_{user.id}",
                "fake_type": 1,
            },
        )

    def test_index_name(self) -> None:
        self.assertEqual(UserIndexer.index_name(), "users")
