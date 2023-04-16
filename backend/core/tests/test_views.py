# Local
from .utils import BaseActionTestCase


class CoreViewsTestCase(BaseActionTestCase):
    def test_index(self) -> None:
        # /!\ Cannot test this view because the file is generated after a build
        pass

    def test_robots_txt(self) -> None:
        response = self.client.get("/robots_txt/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "text/plain")
        self.assertEqual(response.content, b"User-agent: *\nDisallow: /")
