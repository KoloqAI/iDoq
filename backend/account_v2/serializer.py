import re

from rest_framework import serializers

from account_v2.models import Organization, User


class OrganizationSignupSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=150)
    display_name = serializers.CharField(required=True, max_length=150)
    organization_id = serializers.CharField(required=True, max_length=30)

    def validate_organization_id(self, value):  # type: ignore
        if not re.match(r"^[a-z0-9_-]+$", value):
            raise serializers.ValidationError(
                "organization_code should only contain "
                "alphanumeric characters,_ and -."
            )
        return value


class OrganizationCallbackSerializer(serializers.Serializer):
    id = serializers.CharField(required=False)


class GetOrganizationsResponseSerializer(serializers.Serializer):
    id = serializers.CharField()
    display_name = serializers.CharField()
    name = serializers.CharField()
    metadata = serializers.JSONField(required=False, allow_null=True)
    # Add more fields as needed

    def to_representation(self, instance):  # type: ignore
        data = super().to_representation(instance)
        # Modify the representation if needed
        return data


class GetOrganizationMembersResponseSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    email = serializers.CharField()
    name = serializers.CharField()
    picture = serializers.CharField()
    # Add more fields as needed

    def to_representation(self, instance):  # type: ignore
        data = super().to_representation(instance)
        # Modify the representation if needed
        return data


class OrganizationSerializer(serializers.Serializer):
    name = serializers.CharField()
    organization_id = serializers.CharField()


class SetOrganizationsResponseSerializer(serializers.Serializer):
    id = serializers.CharField()
    email = serializers.CharField()
    name = serializers.CharField()
    display_name = serializers.CharField()
    family_name = serializers.CharField()
    picture = serializers.CharField()
    # Add more fields as needed

    def to_representation(self, instance):  # type: ignore
        data = super().to_representation(instance)
        # Modify the representation if needed
        return data


class ModelTenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = fields = ("name", "created_on")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class OrganizationSignupResponseSerializer(serializers.Serializer):
    name = serializers.CharField()
    display_name = serializers.CharField()
    organization_id = serializers.CharField()
    created_at = serializers.CharField()


class LoginRequestSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate_username(self, value: str | None) -> str:
        """Check that the username is not empty and has at least 3
        characters.
        """
        if not value or len(value) < 3:
            raise serializers.ValidationError(
                "Username must be at least 3 characters long."
            )
        return value

    def validate_password(self, value: str | None) -> str:
        """Check that the password is not empty and has at least 3
        characters.
        """
        if not value or len(value) < 3:
            raise serializers.ValidationError(
                "Password must be at least 3 characters long."
            )
        return value


class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    user_id = serializers.CharField(required=True, max_length=150)
    password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)
    country = serializers.CharField(required=True, max_length=100)

    def validate_email(self, value: str) -> str:
        """Check that the email is valid and not already in use."""
        from account_v2.models import User
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_user_id(self, value: str) -> str:
        """Check that the user_id is valid and not already in use."""
        from account_v2.models import User
        if User.objects.filter(user_id=value).exists():
            raise serializers.ValidationError("A user with this user ID already exists.")
        if len(value) < 3:
            raise serializers.ValidationError("User ID must be at least 3 characters long.")
        return value

    def validate_password(self, value: str) -> str:
        """Check that the password meets requirements."""
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value

    def validate(self, data):
        """Check that passwords match."""
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data


class UserSessionResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user_id = serializers.CharField()
    email = serializers.CharField()
    organization_id = serializers.CharField()
    role = serializers.CharField()
    provider = serializers.CharField()
