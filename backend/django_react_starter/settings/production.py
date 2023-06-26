# Built-in
import os

# Third-party
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

# Local
from .base import *  # noqa
from .base import LOGGING  # noqa

FLY_VOLUME_DIR = os.getenv("FLY_VOLUME_DIR")

DEBUG = False
SECRET_KEY = os.getenv("SECRET_KEY")
ENVIRONMENT = os.getenv("ENVIRONMENT")


# --------------------------------------------------------------------------------
# > HTTP
# --------------------------------------------------------------------------------
HOST_DNS_NAMES = os.getenv("HOST_DNS_NAMES", "").split(",")
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    *HOST_DNS_NAMES,
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://127.0.0.1",
    *[f"https://{host_dns_name}" for host_dns_name in HOST_DNS_NAMES],
]
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = True


# --------------------------------------------------------------------------------
# > Media
# --------------------------------------------------------------------------------
MEDIA_ROOT = os.path.join(FLY_VOLUME_DIR, "media-files")


# --------------------------------------------------------------------------------
# > Database
# --------------------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(FLY_VOLUME_DIR, "db.sqlite3"),
    }
}


# --------------------------------------------------------------------------------
# > Logging
# --------------------------------------------------------------------------------
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
SENTRY_KEY = os.getenv("SENTRY_SDK_SECRET_KEY")
SENTRY_INGESTION_FQDN = os.getenv("SENTRY_INGESTION_FQDN")
SENTRY_PROJECT = os.getenv("SENTRY_PROJECT")
if SENTRY_KEY and SENTRY_PROJECT and SENTRY_INGESTION_FQDN:
    sentry_sdk.init(
        dsn=f"https://{SENTRY_KEY}@{SENTRY_INGESTION_FQDN}/{SENTRY_PROJECT}",
        integrations=[DjangoIntegration()],
        traces_sample_rate=1,
        send_default_pii=True,
        environment=ENVIRONMENT,
    )
    SENTRY_INITIALIZED = True
else:
    print("Cannot start Sentry")
