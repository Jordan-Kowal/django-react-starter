from django.contrib.auth import get_user_model, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django_utils_kit.permissions import IsNotAuthenticated
from django_utils_kit.viewsets import ImprovedViewSet
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.serializers import (
    LoginSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetSerializer,
    RegisterSerializer,
)
from authentication.utils import send_password_reset_email
from user.serializers import (
    UserSimpleSerializer,
)

User = get_user_model()


class AuthViewSet(ImprovedViewSet):
    default_serializer_class = None
    permission_classes_per_action = {
        "check": (IsAuthenticated,),
        "login": (IsNotAuthenticated,),
        "logout": (IsAuthenticated,),
        "register": (IsNotAuthenticated,),
        "password_reset": (IsNotAuthenticated,),
        "password_reset_confirm": (IsNotAuthenticated,),
    }
    serializer_class_per_action = {
        "login": LoginSerializer,
        "register": RegisterSerializer,
        "password_reset": PasswordResetSerializer,
        "password_reset_confirm": PasswordResetConfirmSerializer,
    }

    @extend_schema(responses={204: None})
    @action(detail=False, methods=["get"])
    def check(self, request: Request) -> Response:
        return Response(None, status.HTTP_204_NO_CONTENT)

    @extend_schema(responses={204: None})
    @method_decorator(csrf_protect)
    @action(detail=False, methods=["post"])
    def login(self, request: Request) -> Response:
        serializer = self.get_valid_serializer(data=request.data)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response(None, status.HTTP_204_NO_CONTENT)

    @extend_schema(responses={204: None})
    @action(detail=False, methods=["post"])
    def logout(self, request: Request) -> Response:
        logout(request)
        return Response(None, status.HTTP_204_NO_CONTENT)

    @extend_schema(responses={201: UserSimpleSerializer})
    @method_decorator(csrf_protect)
    @action(detail=False, methods=["post"])
    def register(self, request: Request) -> Response:
        serializer = self.get_valid_serializer(data=request.data)
        user = serializer.save()
        login(request, user)
        user_serializer = UserSimpleSerializer(user)
        return Response(user_serializer.data, status.HTTP_201_CREATED)

    @extend_schema(responses={204: None})
    @method_decorator(csrf_protect)
    @action(detail=False, methods=["post"])
    def password_reset(self, request: Request) -> Response:
        serializer = self.get_valid_serializer(data=request.data)
        email = serializer.validated_data["email"]
        user = User.objects.filter(email=email).first()
        if user:
            send_password_reset_email(user)
        return Response(None, status=status.HTTP_204_NO_CONTENT)

    @extend_schema(responses={204: None})
    @method_decorator(csrf_protect)
    @action(detail=False, methods=["post"])
    def password_reset_confirm(self, request: Request) -> Response:
        serializer = self.get_valid_serializer(data=request.data)
        serializer.save()
        return Response(None, status=status.HTTP_204_NO_CONTENT)
