from .base import *  # noqa type: ignore
from .base import BASE_DIR, MEDIA_ROOT  # noqa type: ignore

DEBUG = False
ENVIRONMENT = "test"
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
SECRET_KEY = "+qbi539m9lip0yf5t97a8n4o(_3h@3&3u30kaw@ou5ydav+s_t"
DJANGO_SUPERUSER_EMAIL = "random-email@for-test.com"
DJANGO_SUPERUSER_PASSWORD = "random-password-for-test"

# Media
MEDIA_ROOT = MEDIA_ROOT + "-test"

# Database
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": os.path.join(BASE_DIR.parent, "test.sqlite3"),
#     }
# }

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
