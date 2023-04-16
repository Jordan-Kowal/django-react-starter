# Built-in
from datetime import timedelta

# Third-party
import factory

# Django
from django.utils import timezone
from django_apscheduler.models import DjangoJob, DjangoJobExecution


class SchedulerJobFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = DjangoJob

    id = factory.Sequence(lambda n: f"job_id_{n}")
    next_run_time = None
    job_state = factory.Sequence(lambda n: bytes(f"job_state_{n}", "utf-8"))


class SchedulerJobExecutionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = DjangoJobExecution

    job = factory.SubFactory(SchedulerJobFactory)
    status = DjangoJobExecution.SUCCESS
    run_time = factory.Sequence(lambda n: timezone.now() + timedelta(seconds=n))
    duration = 1.00
    finished = factory.Sequence(
        lambda n: (timezone.now() + timedelta(seconds=n + 1)).timestamp()
    )
    exception = ""
    traceback = ""
