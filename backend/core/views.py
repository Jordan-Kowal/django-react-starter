from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET
from jklib.dj.viewsets import ImprovedViewSet
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from core.serializers import AppConfigSerializer


def index(request: HttpRequest) -> HttpResponse:
    return render(request, "dist/index.html")


@require_GET
def robots_txt(request: HttpRequest) -> HttpResponse:
    lines = [
        "User-agent: *",
        "Disallow: /",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")


class AppViewSet(ImprovedViewSet):
    default_permission_classes = [permissions.IsAuthenticated]
    serializer_class_per_action = {
        "config": AppConfigSerializer,
    }

    @action(detail=False, methods=["GET"])
    def config(self, request: Request) -> Response:
        serializer = self.get_serializer()
        return Response(serializer.data)
