# Built-in
from typing import Any, Dict

# Django
from django import forms
from django.contrib import admin, messages
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm

# Application
from user.models import Profile


class ImprovedUserCreationForm(UserCreationForm):
    """A UserCreationForm that overrides username with email."""

    class Meta:
        model = get_user_model()
        fields = ("email", "username")

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super(UserCreationForm, self).__init__(*args, **kwargs)
        self.fields["username"].widget = forms.HiddenInput()
        self.fields["username"].required = False

    def clean(self) -> Dict[str, Any]:
        super().clean()
        self.cleaned_data["username"] = self.cleaned_data["email"]
        return self.cleaned_data


class ProfileInlineAdmin(admin.StackedInline):
    model = Profile
    fk_name = "user"
    readonly_fields = []
    fields = []
    can_delete = False
    extra = 0
    verbose_name = "Profile"


@admin.register(get_user_model())
class UserModelAdmin(UserAdmin):
    # List view
    list_display = (
        "email",
        "first_name",
        "last_name",
        "is_active",
        "is_staff",
        "is_superuser",
    )
    search_fields = ("email", "first_name", "last_name")
    list_filter = (
        "is_active",
        "is_staff",
        "is_superuser",
    )

    # Detail view
    inlines = [ProfileInlineAdmin]
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "id",
                    "date_joined",
                    "last_login",
                )
            },
        ),
        (
            "Personal information",
            {
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "password",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )
    readonly_fields = ("id", "date_joined", "last_login")

    # Add Form
    add_form = ImprovedUserCreationForm
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
