# Built-in
from datetime import timezone
from typing import TYPE_CHECKING

# Third-party
from apscheduler.executors.pool import ThreadPoolExecutor
from apscheduler.schedulers.background import BlockingScheduler

# Django
from django.contrib.auth import get_user_model
from django_apscheduler.jobstores import DjangoJobStore

if TYPE_CHECKING:
    # Application
    from user.models import User as UserType


User: "UserType" = get_user_model()  # type: ignore

IS_RUNNING_CACHE_KEY = "scheduler_is_running"

# Create scheduler and register jobs
scheduler = BlockingScheduler(
    jobstores={"default": DjangoJobStore()},
    executors={"default": ThreadPoolExecutor(10)},
    timezone=timezone.utc,
)
JOB_DEFAULTS = {
    "max_instances": 1,
    "replace_existing": True,
    "coalesce": True,
    "misfire_grace_time": 60 * 60,  # 1 hour
}

# Add jobs here
