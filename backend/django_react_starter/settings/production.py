# Built-in
import os

# Third-party
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

# Django
import dj_database_url

# Local
from .base import *  # noqa
from .base import APP_VERSION, ENVIRONMENT, LOGGING  # noqa
from ..sentry import traces_sampler

FLY_VOLUME_DIR = os.getenv("FLY_VOLUME_DIR", None)


# --------------------------------------------------------------------------------
# > HTTP
# --------------------------------------------------------------------------------
HOST_DNS_NAMES = os.getenv("HOST_DNS_NAMES", "").split(",")
INTERNAL_IPS = os.getenv("INTERNAL_IPS", "").split(",")
ALLOWED_HOSTS = ["localhost", "127.0.0.1", *HOST_DNS_NAMES, *INTERNAL_IPS]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://127.0.0.1",
    *[f"https://{host_dns_name}" for host_dns_name in HOST_DNS_NAMES],
]
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = False  # Handled by fly.io and necessary for healthchecks


# --------------------------------------------------------------------------------
# > Media
# --------------------------------------------------------------------------------
if FLY_VOLUME_DIR is not None:
    MEDIA_ROOT = os.path.join(FLY_VOLUME_DIR, "media-files")


# --------------------------------------------------------------------------------
# > Database
# --------------------------------------------------------------------------------
db_config = dj_database_url.config(
    default=os.getenv("DATABASE_URL"),
    conn_max_age=600,
    conn_health_checks=True,
)
DATABASES = {
    "default": {
        **db_config,  # type: ignore
        "ENGINE": "django_prometheus.db.backends.postgis",
    }
}

# SQLite
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": os.path.join(FLY_VOLUME_DIR, "db.sqlite3"),
#     }
# }


# --------------------------------------------------------------------------------
# > Logging
# --------------------------------------------------------------------------------
if FLY_VOLUME_DIR is not None:
    LOGGING["handlers"]["console.log"]["filename"] = os.path.join(  # type: ignore
        FLY_VOLUME_DIR, "console.log"
    )


# --------------------------------------------------------------------------------
# > Email
# --------------------------------------------------------------------------------
# To use the SendInBlue API, the IP must be whitelisted in the SendInBlue GUI
# https://app.sendinblue.com/account/security/authorised_ips/
# Make sure to add the server's IP address
EMAIL_BACKEND = "anymail.backends.sendinblue.EmailBackend"
SENDINBLUE_API_URL = "https://api.sendinblue.com/v3/"
ANYMAIL = {
    "SENDINBLUE_API_KEY": os.getenv("SENDINBLUE_API_KEY"),
}


# --------------------------------------------------------------------------------
# > Sentry
# --------------------------------------------------------------------------------
SENTRY_DSN = os.getenv("SENTRY_DSN")
if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        environment=ENVIRONMENT,
        integrations=[DjangoIntegration()],
        send_default_pii=False,  # GDPR
        traces_sampler=traces_sampler,
        profiles_sample_rate=0.2,
        release=f"rainly-api@{APP_VERSION}",
    )
    SENTRY_INITIALIZED = True
else:
    print("Cannot start Sentry")
