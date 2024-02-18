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
        from core.scheduler import IS_RUNNING_CACHE_KEY, scheduler

        try:
            cache.set(IS_RUNNING_CACHE_KEY, False)
            LOGGER.info("[core] Starting scheduler...")
            cache.set(IS_RUNNING_CACHE_KEY, True)
            scheduler.start()
        except KeyboardInterrupt:
            LOGGER.info("[core] Stopping scheduler...")
            cache.set(IS_RUNNING_CACHE_KEY, False)
            scheduler.shutdown()
            LOGGER.info("[core] Scheduler shut down successfully!")
