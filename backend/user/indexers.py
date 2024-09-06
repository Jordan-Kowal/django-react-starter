from typing import Any, Dict

from jklib.meili.dj.indexer import MeilisearchModelIndexer

from user.models import User


class UserIndexer(MeilisearchModelIndexer[User]):
    """This is an example of how to add a custom indexer for the User model."""

    MODEL_CLASS = User
    PRIMARY_KEY = "id"
    SETTINGS = {
        "filterableAttributes": ["fake_type"],
        "searchableAttributes": ["indexed_name"],
        "sortableAttributes": ["indexed_name"],
    }

    @classmethod
    def build_object(cls, user: User) -> Dict[str, Any]:
        return {
            "id": user.id,
            "indexed_name": user.indexed_name,
            "fake_type": 1,
        }

    @classmethod
    def index_name(cls) -> str:
        return "users"
