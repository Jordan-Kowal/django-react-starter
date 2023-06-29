# Django
from django.conf import settings
from rest_framework.reverse import reverse

# Local
from .utils import BaseActionTestCase


class CoreViewsTestCase(BaseActionTestCase):
    def test_index(self) -> None:
        # /!\ Cannot test this view because the file is generated after a build
        pass

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
