# Built-in
import logging
from typing import Any

# Third-party
from apscheduler.schedulers import SchedulerNotRunningError

# Django
from django.core.management import BaseCommand

LOGGER = logging.getLogger("default")


class Command(BaseCommand):
    help = "Stops the scheduler"

    def handle(self, *args: Any, **options: Any) -> None:
        # Application
        from core.scheduler import scheduler

        try:
            LOGGER.info("[core] Stopping scheduler...")
            scheduler.shutdown()
            LOGGER.info("[core] Scheduler shut down successfully!")
        except SchedulerNotRunningError:
            LOGGER.error("[core] No scheduler currently running...")
