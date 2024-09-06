from typing import Dict, List

from celery import shared_task
from celery.schedules import crontab
from django.conf import settings
from django.db.models import Q


@shared_task(queue=settings.RABBITMQ_USER_QUEUE)
def index_all_users_atomically() -> Dict[str, str]:
    from user.indexers import UserIndexer

    UserIndexer.index_all_atomically()
    return {"result": "ok"}


@shared_task(queue=settings.RABBITMQ_USER_QUEUE)
def index_users(ids: List[int]) -> Dict[str, str]:
    from user.indexers import UserIndexer

    UserIndexer.index_from_query(Q(pk__in=ids))
    return {"result": "ok"}


@shared_task(queue=settings.RABBITMQ_USER_QUEUE)
def unindex_users(ids: List[int]) -> Dict[str, str]:
    from user.indexers import UserIndexer

    UserIndexer.unindex_multiple(ids)
    return {"result": "ok"}


scheduled_cron_tasks = {
    "index_all_users_atomically": {
        "task": "users.tasks.index_all_users_atomically",
        "schedule": crontab(hour="1", minute="0"),
    }
}
