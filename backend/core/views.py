# Django
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET


def index(request: HttpRequest) -> HttpResponse:
    return render(request, "dist/index.html")


@require_GET
def robots_txt(request: HttpRequest) -> HttpResponse:
    lines = [
        "User-agent: *",
        "Disallow: /",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")


@require_GET
def ping(request: HttpRequest) -> HttpResponse:
    return HttpResponse("pong", content_type="text/plain")
