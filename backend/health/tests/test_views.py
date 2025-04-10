from unittest.mock import Mock, patch

from django.db import DatabaseError
from rest_framework.response import Response
from rest_framework.reverse import reverse

from core.tests import BaseActionTestCase

HEALTH_API_URL = reverse("health-api")
HEALTH_DATABASE_URL = reverse("health-database")
HEALTH_RABBITMQ_URL = reverse("health-rabbitmq")
HEALTH_CELERY_URL = reverse("health-celery")
HEALTH_MEILISEARCH_URL = reverse("health-meilisearch")


class HealthViewSetTestCase(BaseActionTestCase):
    def test_api_success(self) -> None:
        response = self.api_client.get(HEALTH_API_URL)
        self.assertEqual(response.status_code, 200)

    def test_database_success(self) -> None:
        response = self.api_client.get(HEALTH_DATABASE_URL)
        self.assertEqual(response.status_code, 200)

    @patch("user.models.User.objects.exists")
    def test_database_crash(self, mock_exists: Mock) -> None:
        mock_exists.side_effect = DatabaseError("DB Crash!")
        response = self.api_client.get(HEALTH_DATABASE_URL)
        self.assertEqual(response.status_code, 500)

    @patch("requests.get")
    def test_rabbitmq_success(self, mock_get: Mock) -> None:
        mock_get.return_value = Mock(status_code=200)
        response = self.api_client.get(HEALTH_RABBITMQ_URL)
        self.assertEqual(response.status_code, 200)

    @patch("requests.get")
    def test_rabbitmq_fail(self, mock_get: Mock) -> None:
        mock_get.return_value = Response(status=500)
        response = self.api_client.get(HEALTH_RABBITMQ_URL)
        self.assertEqual(response.status_code, 500)

    @patch("requests.get")
    def test_rabbitmq_crash(self, mock_get: Mock) -> None:
        mock_get.side_effect = Exception("RabbitMQ Crash!")
        response = self.api_client.get(HEALTH_RABBITMQ_URL)
        self.assertEqual(response.status_code, 500)

    @patch("health.views.celery_app.control.ping")
    def test_celery_success(self, mock_ping: Mock) -> None:
        mock_ping.return_value = True
        response = self.api_client.get(HEALTH_CELERY_URL)
        self.assertEqual(response.status_code, 200)

    @patch("health.views.celery_app.control.ping")
    def test_celery_fail(self, mock_ping: Mock) -> None:
        mock_ping.return_value = False
        response = self.api_client.get(HEALTH_CELERY_URL)
        self.assertEqual(response.status_code, 500)

    @patch("health.views.celery_app.control.ping")
    def test_celery_crash(self, mock_ping: Mock) -> None:
        mock_ping.side_effect = Exception("Celery Crash!")
        response = self.api_client.get(HEALTH_CELERY_URL)
        self.assertEqual(response.status_code, 500)

    @patch("meilisearch.Client.health")
    def test_meilisearch_success(self, mock_health: Mock) -> None:
        mock_health.return_value = {"status": "available"}
        response = self.api_client.get(HEALTH_MEILISEARCH_URL)
        self.assertEqual(response.status_code, 200)

    @patch("meilisearch.Client.health")
    def test_meilisearch_fail(self, mock_health: Mock) -> None:
        mock_health.return_value = {"status": "unavailable"}
        response = self.api_client.get(HEALTH_MEILISEARCH_URL)
        self.assertEqual(response.status_code, 500)

    @patch("meilisearch.Client.health")
    def test_meilisearch_crash(self, mock_health: Mock) -> None:
        mock_health.side_effect = Exception("Meilisearch Crash!")
        response = self.api_client.get(HEALTH_MEILISEARCH_URL)
        self.assertEqual(response.status_code, 500)
