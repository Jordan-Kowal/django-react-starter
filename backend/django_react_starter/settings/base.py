# Built-in
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# --------------------------------------------------------------------------------
# > Application
# --------------------------------------------------------------------------------
APP_NAME = "django_react_starter"
APP_VERSION = os.getenv("APP_VERSION", "")
SESSION_COOKIE_NAME = f"{APP_NAME}-sessionid"
CSRF_COOKIE_NAME = f"{APP_NAME}-csrftoken"

DEBUG = False
SECRET_KEY = os.getenv("SECRET_KEY")
ENVIRONMENT = os.getenv("ENVIRONMENT")

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party
    "rest_framework",
    "django_filters",
    "drf_spectacular",
    "django_apscheduler",
    # Custom
    "core",
    "user",
    # Other third party
    "django_cleanup.apps.CleanupConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "django_react_starter.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "django_react_starter", "templates"),
            os.path.join(BASE_DIR, "frontend"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "django_react_starter.wsgi.application"


# --------------------------------------------------------------------------------
# > Static files
# --------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/4.0/howto/static-files/
STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static-files")
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend", "dist", "static"),
]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# --------------------------------------------------------------------------------
# > Media files
# --------------------------------------------------------------------------------
MEDIA_URL = "media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media-files")


# --------------------------------------------------------------------------------
# > Database
# --------------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

POSTGRES_HOST = os.getenv("POSTGRES_HOST", "postgres")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5432)
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": POSTGRES_HOST,
        "PORT": POSTGRES_PORT,
        "USER": POSTGRES_USER,
        "PASSWORD": POSTGRES_PASSWORD,
        "NAME": POSTGRES_DB,
    }
}

# SQLite
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
#     }
# }


# --------------------------------------------------------------------------------
# > User, Passwords, and Authentication
# --------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators
AUTH_USER_MODEL = "user.User"
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",  # noqa
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LOGIN_REDIRECT_URL = "/"
DJANGO_SUPERUSER_EMAIL = os.getenv("DJANGO_SUPERUSER_EMAIL")
DJANGO_SUPERUSER_PASSWORD = os.getenv("DJANGO_SUPERUSER_PASSWORD")


# --------------------------------------------------------------------------------
# > Internationalization
# --------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/4.0/topics/i18n/
LANGUAGE_CODE = "fr-fr"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# --------------------------------------------------------------------------------
# > DRF
# --------------------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_PAGINATION_CLASS": "jklib.dj.pagination.BasicPagination",
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",  # Must be first
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
    "DEFAULT_PARSER_CLASSES": ("rest_framework.parsers.JSONParser",),
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
}

# --------------------------------------------------------------------------------
# > Logging
# --------------------------------------------------------------------------------
MAX_SIZE = 1_000_000  # 1Mo
BACKUP_COUNT = 2
LOG_FOLDER = os.path.join(BASE_DIR, "logs")
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "simple": {
            "format": "{asctime} | {levelname} | {message}",
            "style": "{",
        },
    },
    "filters": {},
    "handlers": {
        # Outputs everything in the stderr
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        # Default file logger for generic information
        "console.log": {
            "level": "INFO",
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "simple",
            "filename": os.path.join(LOG_FOLDER, "console.log"),
            "maxBytes": MAX_SIZE,
            "backupCount": BACKUP_COUNT,
        },
    },
    "loggers": {
        "default": {
            "handlers": ["console.log", "console"],
            "level": "INFO",
            "propagate": True,
        },
    },
}


# --------------------------------------------------------------------------------
# > Email
# --------------------------------------------------------------------------------
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "fake-email@fake_domain.fake")
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# --------------------------------------------------------------------------------
# > Sentry
# --------------------------------------------------------------------------------
SENTRY_INITIALIZED = False
