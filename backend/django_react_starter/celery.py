from celery import Celery
from django.conf import settings
from kombu import Exchange, Queue

from django_react_starter.settings.base import CELERY_CONFIG_PREFIX
from user.tasks import scheduled_cron_tasks as user_schedule

app = Celery("django_react_starter")
app.config_from_object("django.conf:settings", namespace=CELERY_CONFIG_PREFIX)
app.autodiscover_tasks()

app.conf.task_queues = [
    Queue(
        settings.RABBITMQ_USER_QUEUE,
        Exchange(settings.RABBITMQ_USER_QUEUE),
        routing_key=settings.RABBITMQ_USER_QUEUE,
    ),
]

app.conf.beat_schedule = {
    **user_schedule,
}

app.conf.timezone = "UTC"
