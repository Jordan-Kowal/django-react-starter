# Django
from django.conf import settings
from rest_framework import serializers


class AppConfigSerializer(serializers.Serializer):
    debug = serializers.BooleanField(initial=settings.DEBUG)
    media_url = serializers.CharField(initial=settings.MEDIA_URL)
    static_url = serializers.CharField(initial=settings.STATIC_URL)
