#!/bin/bash

set -ex

if [[ "$RUN_AS_DEV_SERVER" == 1 ]]; then
    echo "[run-scheduler] No scheduler in development mode"
    sleep infinity
else
    echo "[run-scheduler] Starting scheduler in 30 seconds..."
    sleep 30
    echo "[run-scheduler] Starting scheduler"
    python manage.py startscheduler --settings=django_react_starter.settings.production
fi
