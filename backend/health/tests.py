from unittest.mock import Mock, patch

from django.core.cache import cache
from django.db import DatabaseError
from rest_framework.reverse import reverse

from core.tests import BaseActionTestCase
from scheduler import scheduler


class HealthViewSetTestCase(BaseActionTestCase):
    def test_api_success(self) -> None:
        url = reverse("health-api")
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_database_success(self) -> None:
        url = reverse("health-database")
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)

    @patch("user.models.User.objects.exists")
    def test_database_crash(self, mock_exists: Mock) -> None:
        mock_exists.side_effect = DatabaseError("DB Crash!")
        url = reverse("health-database")
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 500)

    def test_scheduler_success(self) -> None:
        cache.set(scheduler.IS_RUNNING_CACHE_KEY, True)
        url = reverse("health-scheduler")
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_scheduler_error(self) -> None:
        cache.set(scheduler.IS_RUNNING_CACHE_KEY, False)
        url = reverse("health-scheduler")
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 500)

    @patch("django.core.cache.cache.get")
    def test_scheduler_crash(self, mock_cache_get: Mock) -> None:
        mock_cache_get.side_effect = Exception("Cache Crash!")
        cache.set(scheduler.IS_RUNNING_CACHE_KEY, True)
        url = reverse("health-scheduler")
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 500)
