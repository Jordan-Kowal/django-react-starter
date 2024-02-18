# Local
from .base import *  # noqa type: ignore

DEBUG = True
ENVIRONMENT = "development"
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "api",  # Name of the django service in docker-compose.yml, used by frontend
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",  # React dev server
    "http://localhost:8000/",
]
SECRET_KEY = "yq-^$c^8r-^zebn#n+ilw3zegt9^9!b9@)-sv1abpca3i%hrko"
DJANGO_SUPERUSER_EMAIL = "kowaljordan@gmail.com"
DJANGO_SUPERUSER_PASSWORD = "password"
