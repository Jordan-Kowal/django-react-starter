from unittest.mock import Mock, patch

from django.conf import settings
from django.http import HttpResponse
from django.test import override_settings
from rest_framework.reverse import reverse

from .utils import BaseActionTestCase

APP_CONFIG_URL = reverse("app-config")
INDEX_URL = "/"
ROBOTS_TXT_URL = "/robots.txt/"


class CoreViewsTestCase(BaseActionTestCase):
    @patch("core.views.render")
    def test_index(self, render_mock: Mock) -> None:
        render_mock.return_value = HttpResponse(content="<h1>Hello</h1>")
        response = self.client.get(INDEX_URL)
        args, kwargs = render_mock.call_args
        self.assertEqual(args[1], "dist/index.html")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b"<h1>Hello</h1>")

    def test_robots_txt(self) -> None:
        response = self.client.get(ROBOTS_TXT_URL)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "text/plain")
        self.assertEqual(response.content, b"User-agent: *\nDisallow: /")


class AppViewSetTestCase(BaseActionTestCase):
    @override_settings(APP_VERSION="v0.0.0")
    def test_config_success(self) -> None:
        self.api_client.force_authenticate(self.user)
        response = self.api_client.get(APP_CONFIG_URL)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["debug"], False)
        self.assertEqual(response.data["media_url"], settings.MEDIA_URL)
        self.assertEqual(response.data["static_url"], settings.STATIC_URL)
        self.assertEqual(response.data["app_version"], "v0.0.0")

    def test_config_error_if_not_authenticated(self) -> None:
        response = self.api_client.get(APP_CONFIG_URL)
        self.assertEqual(response.status_code, 401)
