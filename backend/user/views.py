from django.contrib.auth import get_user_model, login, logout
from drf_spectacular.utils import PolymorphicProxySerializer, extend_schema
from jklib.dj.permissions import IsNotAuthenticated
from jklib.dj.viewsets import ImprovedViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from user.serializers import LoginSerializer, UpdatePasswordSerializer, UserSerializer

User = get_user_model()


class AuthViewSet(ImprovedViewSet):
    default_serializer_class = LoginSerializer
    permission_classes_per_action = {
        "check": (IsAuthenticated,),
        "login": (IsNotAuthenticated,),
        "logout": (IsAuthenticated,),
    }

    @extend_schema(responses={204: None})
    @action(detail=False, methods=["get"])
    def check(self, request: Request) -> Response:
        return Response(None, status.HTTP_204_NO_CONTENT)

    @extend_schema(responses={204: None})
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


class CurrentUserViewSet(ImprovedViewSet):
    """For the current user to view/update some of its information."""

    default_permission_classes = (IsAuthenticated,)
    default_serializer_class = UserSerializer
    serializer_class_per_action = {
        "update_password": UpdatePasswordSerializer,
    }
    pagination_class = None

    @extend_schema(responses={200: UserSerializer})
    def create(self, request: Request) -> Response:
        """UPDATE the user."""
        serializer = self.get_valid_serializer(request.user, data=request.data)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)

    # Hack to tell swagger it is NOT a list
    @extend_schema(
        responses={
            200: PolymorphicProxySerializer(
                "SingleUserSerializer",
                serializers=[UserSerializer],
                resource_type_field_name=None,
                many=False,
            )
        }
    )
    def list(self, request: Request) -> Response:
        """RETRIEVE the user."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status.HTTP_200_OK)

    @extend_schema(responses={204: None})
    @action(detail=False, methods=["post"])
    def update_password(self, request: Request) -> Response:
        serializer = self.get_valid_serializer(request.user, data=request.data)
        serializer.save()
        return Response(None, status.HTTP_204_NO_CONTENT)
