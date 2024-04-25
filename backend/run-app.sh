#!/bin/bash

set -e

# Choose settings
if [[ "$RUN_AS_DEV_SERVER" == 1 ]]; then
  SETTINGS=django_react_starter.settings.development
else
  SETTINGS=django_react_starter.settings.production
fi

# Setup the app
python manage.py collectstatic --noinput --settings=$SETTINGS
python manage.py migrate --settings=$SETTINGS
python manage.py createsu --settings=$SETTINGS

# Run the app
if [[ "$RUN_AS_DEV_SERVER" == 1 ]]; then
  echo "[run-app] Running app in development mode"
  python manage.py runserver 0.0.0.0:8000 --settings=$SETTINGS
else
  echo "[run-app] Running app in production mode"
  gunicorn django_react_starter.wsgi:application \
    --bind=:${PORT:-8000} \
    --workers=${GUNICORN_WORKERS:-4}
fi
