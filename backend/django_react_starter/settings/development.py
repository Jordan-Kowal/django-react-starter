# Local
from .base import *  # noqa type: ignore

DEBUG = True
ENVIRONMENT = "development"
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",  # React dev server
    "http://localhost:8000/",
]
# Env override
SECRET_KEY = "django-insecure-cb7(pt2v*1*=%kgz(e(vm9q+wlm4olyz_!(bef$3nlwp)xi)g*"
DJANGO_SUPERUSER_EMAIL = "kowaljordan@gmail.com"
DJANGO_SUPERUSER_PASSWORD = "password"
