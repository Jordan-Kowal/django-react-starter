# Third-party
from jklib.dj.viewsets import ImprovedViewSet

# Django
from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

# Application
from core import scheduler

User = get_user_model()


class HealthViewSet(ImprovedViewSet):
    default_permission_classes = [AllowAny]
    default_serializer_class = None

    @action(detail=False, methods=["get"])
    def api(self, _request: Request) -> Response:
        try:
            return Response(status=HTTP_200_OK, data="API up")
        except Exception:
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR, data="API down")

    @action(detail=False, methods=["get"])
    def database(self, _request: Request) -> Response:
        try:
            User.objects.exists()
            return Response(status=HTTP_200_OK, data="Database up")
        except Exception:
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR, data="Database down")

    @action(detail=False, methods=["get"])
    def scheduler(self, _request: Request) -> Response:
        try:
            if cache.get(scheduler.IS_RUNNING_CACHE_KEY):
                return Response(status=HTTP_200_OK, data="Scheduler up")
            return Response(
                status=HTTP_500_INTERNAL_SERVER_ERROR, data="Scheduler down"
            )
        except Exception:
            return Response(
                status=HTTP_500_INTERNAL_SERVER_ERROR, data="Scheduler down"
            )
