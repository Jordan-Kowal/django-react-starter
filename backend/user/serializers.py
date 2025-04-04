from typing import TYPE_CHECKING, Any, Dict

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from user.models import Profile

if TYPE_CHECKING:
    from user.models import User as UserType

User = get_user_model()


# ----------------------------------------
# Login
# ----------------------------------------
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


# ----------------------------------------
# Register
# ----------------------------------------
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


# ----------------------------------------
# Password
# ----------------------------------------
class UpdatePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )
    new_password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )

    class Meta:
        fields = ["current_password", "new_password"]

    def validate_current_password(self, current_password: str) -> str:
        if not self.instance.check_password(current_password):
            raise serializers.ValidationError("Current password is incorrect")
        return current_password

    @staticmethod
    def validate_new_password(value: str) -> str:
        validate_password(value)
        return value

    @staticmethod
    def update(user: "UserType", validated_data: Dict) -> "UserType":
        user.set_password(validated_data["new_password"])
        user.save()
        return user


# ----------------------------------------
# Profile
# ----------------------------------------
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user"]
        read_only_fields = ["user"]


# ----------------------------------------
# User
# ----------------------------------------
class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name"]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "is_staff",
            "is_superuser",
            "profile",
        ]
        read_only_fields = ["id", "is_active", "is_staff", "is_superuser"]
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"required": True},
        }

    @staticmethod
    def create(validated_data: Dict) -> "UserType":
        raise NotImplementedError

    def update(self, user: "UserType", validated_data: Dict) -> "UserType":
        # User
        user.first_name = validated_data["first_name"]
        user.last_name = validated_data["last_name"]
        user.email = validated_data["email"]
        user.save()
        return user
