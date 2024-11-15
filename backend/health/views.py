from django.conf import settings
from django.contrib.auth import get_user_model
from django_utils_kit.viewsets import ImprovedViewSet
from meilisearch import Client
import requests
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

from django_react_starter.celery import app as celery_app

User = get_user_model()


class HealthViewSet(ImprovedViewSet):
    default_permission_classes = [AllowAny]
    default_serializer_class = None

    @action(detail=False, methods=["get"])
    def api(self, _request: Request) -> Response:
        return Response(status=HTTP_200_OK, data="API up")

    @action(detail=False, methods=["get"])
    def database(self, _request: Request) -> Response:
        try:
            User.objects.exists()
            return Response(status=HTTP_200_OK, data="Database up")
        except Exception:
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR, data="Database down")

    @action(detail=False, methods=["get"])
    def rabbitmq(self, _request: Request) -> Response:
        try:
            verify = settings.RABBITMQ_HEALTHCHECK_URL.startswith("https")
            response = requests.get(
                settings.RABBITMQ_HEALTHCHECK_URL,
                auth=(settings.RABBITMQ_USERNAME, settings.RABBITMQ_PASSWORD),
                verify=verify,
            )
            response.raise_for_status()
            return Response(status=HTTP_200_OK, data="RabbitMQ up")
        except Exception:
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR, data="RabbitMQ down")

    @action(detail=False, methods=["get"])
    def celery(self, _request: Request) -> Response:
        try:
            pong = celery_app.control.ping()
            if not pong:
                raise Exception("No Celery workers")
            return Response(status=HTTP_200_OK, data="Celery workers up")
        except Exception:
            return Response(
                status=HTTP_500_INTERNAL_SERVER_ERROR, data="Celery workers down"
            )

    @action(detail=False, methods=["get"])
    def meilisearch(self, _request: Request) -> Response:
        try:
            client = Client(settings.MEILISEARCH_HOST, settings.MEILISEARCH_API_KEY)
            response = client.health()
            status = response.get("status")
            if status != "available":
                raise Exception("Meilisearch down")
            return Response(status=HTTP_200_OK, data="Meilisearch up")
        except Exception:
            return Response(
                status=HTTP_500_INTERNAL_SERVER_ERROR,
                data="Cannot reach Meilisearch server",
            )
