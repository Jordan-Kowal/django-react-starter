from .base import *  # noqa type: ignore
from .base import MEDIA_ROOT  # noqa type: ignore

DEBUG = False
ENVIRONMENT = "test"
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
SECRET_KEY = "+qbi539m9lip0yf5t97a8n4o(_3h@3&3u30kaw@ou5ydav+s_t"
DJANGO_SUPERUSER_EMAIL = "random-email@for-test.com"
DJANGO_SUPERUSER_PASSWORD = "random-password-for-test"
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

# Media
MEDIA_ROOT = MEDIA_ROOT + "-test"

# Logging: Logs are still captured but none are displayed in the console
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "level": "CRITICAL",  # To hide info/warning/error logs from test console
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
}
