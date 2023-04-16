# Built-in
import logging
from typing import Any

# Django
from django.core.management import BaseCommand

LOGGER = logging.getLogger("default")


class Command(BaseCommand):
    help = "Starts the scheduler"

    def handle(self, *args: Any, **options: Any) -> None:
        # Application
        from core.scheduler import scheduler

        try:
            LOGGER.info("[core] Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            LOGGER.info("[core] Stopping scheduler...")
            scheduler.shutdown()
            LOGGER.info("[core] Scheduler shut down successfully!")
