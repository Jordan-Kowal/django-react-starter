from typing import TYPE_CHECKING, Any, Dict

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import serializers

if TYPE_CHECKING:
    from user.models import User as UserType

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True, allow_blank=False, allow_null=False)
    password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )

    class Meta:
        fields = ["email", "password"]

    @staticmethod
    def validate(data: Dict[str, Any]) -> Dict[str, Any]:
        email = data["email"]
        password = data["password"]
        user = User.objects.filter(email=email).first()
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            raise serializers.ValidationError("Your account is inactive")
        return {"user": user}


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True, allow_blank=False, allow_null=False)
    password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )

    class Meta:
        fields = ["email", "password"]

    def validate_email(self, email: str) -> str:
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("This email is already used")
        return email

    @staticmethod
    def validate_password(value: str) -> str:
        validate_password(value)
        return value

    def create(self, validated_data: Dict[str, Any]) -> "UserType":
        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["email"],
            is_active=True,
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True, allow_blank=False, allow_null=False)

    class Meta:
        fields = ["email"]


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField(write_only=True, allow_blank=False, allow_null=False)
    uid = serializers.IntegerField(write_only=True)
    password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )

    class Meta:
        fields = ["token", "uid", "password"]

    def validate_password(self, value: str) -> str:
        validate_password(value)
        return value

    def validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        user_id = data.get("uid")
        token = data.get("token")
        # Get user
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid information")
        # Validate token
        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, token):
            raise serializers.ValidationError("Invalid information")

        data["user"] = user
        return data

    def save(self, **kwargs: Any) -> "UserType":
        user = self.validated_data["user"]
        user.set_password(self.validated_data["password"])
        user.save()
        return user
