# Built-in
import os

# Local
from .base import *  # noqa type: ignore
from .base import BASE_DIR  # noqa type: ignore

DEBUG = False
ENVIRONMENT = "test"
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# Env override
SECRET_KEY = "django-insecure-cb7(pt2v*1*=%kgz(e(vm9q+wlm4olyz_!(bef$3nlwp)xi)g*"
DJANGO_SUPERUSER_EMAIL = "random-email@for-test.com"
DJANGO_SUPERUSER_PASSWORD = "random-password-for-test"

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR.parent, "test.sqlite3"),
    }
}
