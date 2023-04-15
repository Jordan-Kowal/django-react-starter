#!/bin/bash

set -ex

if [[ "$RUN_AS_DEV_SERVER" == 1 ]]; then
    echo "[run-app] Running django app in development mode"
    SETTINGS=django_react_starter.settings.development
    echo "[run-app] Collecting static files"
    rm -rf static-files/*
    python manage.py collectstatic --noinput --settings=$SETTINGS
    echo "[run-app] Applying migrations"
    python manage.py migrate --settings=$SETTINGS
    echo "[run-app] Creating superuser"
    python manage.py createsu --settings=$SETTINGS
    echo "[run-app] Starting server"
    python manage.py runserver 0.0.0.0:8000 --settings=$SETTINGS
else
    echo "[run-app] Running django app in production mode"
    SETTINGS=django_react_starter.settings.production
    python manage.py collectstatic --noinput --settings=$SETTINGS
    python manage.py migrate --settings=$SETTINGS
    python manage.py createsu --settings=$SETTINGS
    gunicorn django_react_starter.wsgi:application \
        --bind=:${PORT:-8000} \
        --workers=${GUNICORN_WORKERS:-4}
fi
