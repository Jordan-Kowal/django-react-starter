# Built-in
from typing import TYPE_CHECKING, Any, Dict

# Django
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

# Application
from user.models import Profile

if TYPE_CHECKING:
    # Application
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
            raise serializers.ValidationError("Identifiants de connexion invalides")
        if not user.check_password(password):
            raise serializers.ValidationError("Identifiants de connexion invalides")
        if not user.is_active:
            raise serializers.ValidationError("Votre utilisateur est inactif")
        return {"user": user}


# ----------------------------------------
# Password
# ----------------------------------------
class UpdatePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )
    password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )
    confirm_password = serializers.CharField(
        write_only=True, allow_blank=False, allow_null=False
    )

    class Meta:
        fields = ["current_password", "password", "confirm_password"]

    def validate_current_password(self, current_password: str) -> str:
        if not self.instance.check_password(current_password):
            raise serializers.ValidationError("Mot de passe actuel incorrect")
        return current_password

    @staticmethod
    def validate_password(value: str) -> str:
        validate_password(value)
        return value

    def validate_confirm_password(self, value: str) -> str:
        password = self.initial_data["password"]
        if value != password:
            raise serializers.ValidationError("Les mots de passe ne correspondent pas")
        return value

    @staticmethod
    def update(user: "UserType", validated_data: Dict) -> "UserType":
        user.set_password(validated_data["password"])
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
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "profile",
        ]
        read_only_fields = ["id", "is_active"]
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
        # Profile
        # profile_data = validated_data.pop("profile")
        return user
