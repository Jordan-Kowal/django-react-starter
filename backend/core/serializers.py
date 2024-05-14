# Django
from django.conf import settings
from rest_framework import serializers


class AppConfigSerializer(serializers.Serializer):
    debug = serializers.BooleanField(initial=lambda: settings.DEBUG)
    media_url = serializers.CharField(initial=lambda: settings.MEDIA_URL)
    static_url = serializers.CharField(initial=lambda: settings.STATIC_URL)
    app_version = serializers.CharField(initial=lambda: settings.APP_VERSION)
