# Built-in
from unittest.mock import Mock, patch

# Django
from django.conf import settings
from django.http import HttpResponse
from rest_framework.reverse import reverse

# Local
from .utils import BaseActionTestCase


class CoreViewsTestCase(BaseActionTestCase):
    @patch("core.views.render")
    def test_index(self, render_mock: Mock) -> None:
        render_mock.return_value = HttpResponse(content="<h1>Hello</h1>")
        response = self.client.get("/")
        args, kwargs = render_mock.call_args
        self.assertEqual(args[1], "dist/index.html")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b"<h1>Hello</h1>")

    def test_robots_txt(self) -> None:
        response = self.client.get("/robots.txt/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "text/plain")
        self.assertEqual(response.content, b"User-agent: *\nDisallow: /")


class AppViewSetTestCase(BaseActionTestCase):
    def test_config_success(self) -> None:
        url = reverse("app-config")
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["debug"], False)
        self.assertEqual(response.data["media_url"], settings.MEDIA_URL)
        self.assertEqual(response.data["static_url"], settings.STATIC_URL)
