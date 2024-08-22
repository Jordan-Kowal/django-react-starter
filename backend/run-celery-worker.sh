#!/bin/bash

set -e

# Start the celery workers
echo "[run-celery-worker] Starting celery worker in 15 seconds..."
sleep 15
echo "[run-celery-worker] Starting celery worker"
celery --app=django_react_starter worker --beat --loglevel=INFO --concurrency=${CELERY_WORKERS:-2} --scheduler=celery.beat.Scheduler
