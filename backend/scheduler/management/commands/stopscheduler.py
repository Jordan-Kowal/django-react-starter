# Built-in
import logging
from typing import Any

# Third-party
from apscheduler.schedulers import SchedulerNotRunningError

# Django
from django.core.cache import cache
from django.core.management import BaseCommand

LOGGER = logging.getLogger("default")


class Command(BaseCommand):
    help = "Stops the scheduler"

    def handle(self, *args: Any, **options: Any) -> None:
        # Application
        from scheduler.scheduler import IS_RUNNING_CACHE_KEY, blocking_scheduler

        try:
            cache.set(IS_RUNNING_CACHE_KEY, False)
            LOGGER.info("[core] Stopping scheduler...")
            blocking_scheduler.shutdown()
            LOGGER.info("[core] Scheduler shut down successfully!")
        except SchedulerNotRunningError:
            LOGGER.error("[core] No scheduler currently running...")
