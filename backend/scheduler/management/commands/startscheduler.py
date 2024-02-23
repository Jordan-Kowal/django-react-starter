# Built-in
import logging
from typing import Any

# Django
from django.core.cache import cache
from django.core.management import BaseCommand

LOGGER = logging.getLogger("default")


class Command(BaseCommand):
    help = "Starts the scheduler"

    def handle(self, *args: Any, **options: Any) -> None:
        # Application
        from scheduler.scheduler import IS_RUNNING_CACHE_KEY, blocking_scheduler

        try:
            LOGGER.info("[core] Starting scheduler...")
            cache.set(IS_RUNNING_CACHE_KEY, True)
            blocking_scheduler.start()
        except KeyboardInterrupt:
            LOGGER.info("[core] Stopping scheduler...")
            cache.set(IS_RUNNING_CACHE_KEY, False)
            blocking_scheduler.shutdown()
            LOGGER.info("[core] Scheduler shut down successfully!")
