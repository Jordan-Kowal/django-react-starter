from django.contrib.auth import get_user_model, logout, update_session_auth_hash
from django_utils_kit.viewsets import ImprovedViewSet
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from user.serializers import (
    UpdatePasswordSerializer,
    UserSimpleSerializer,
)

User = get_user_model()


class CurrentUserViewSet(ImprovedViewSet):
    """For the current user to view/update some of its information."""

    default_permission_classes = (IsAuthenticated,)
    serializer_class_per_action = {
        "account": UserSimpleSerializer,
        "password": UpdatePasswordSerializer,
    }

    @extend_schema(
        methods=["DELETE"],
        description="Delete the current user's account.",
        responses={204: None},
    )
    @extend_schema(
        methods=["PUT"],
        description="Update the current user's account.",
        responses={200: UserSimpleSerializer},
    )
    @extend_schema(
        methods=["GET"],
        description="Get the current user's account.",
        responses={200: UserSimpleSerializer},
    )
    @action(detail=False, methods=["get", "put", "delete"])
    def account(self, request: Request) -> Response:
        """Handle account operations: GET, PUT, DELETE."""
        if request.method == "GET":
            # Fetch the user data
            serializer = self.get_serializer(request.user)
            return Response(serializer.data, status.HTTP_200_OK)
        elif request.method == "PUT":
            # Update the user
            serializer = self.get_valid_serializer(request.user, data=request.data)
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        elif request.method == "DELETE":
            # Delete the current user
            user = request.user
            logout(request)
            user.delete()
            return Response(None, status.HTTP_204_NO_CONTENT)
        return Response(None, status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(responses={204: None})
    @action(detail=False, methods=["put"])
    def password(self, request: Request) -> Response:
        serializer = self.get_valid_serializer(request.user, data=request.data)
        user = serializer.save()
        update_session_auth_hash(request, user)
        return Response(None, status.HTTP_204_NO_CONTENT)
