# Django
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.utils.safestring import mark_safe
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import routers

# Application
from core.views import AppViewSet, index, robots_txt
from health.views import HealthViewSet
from user.views import AuthViewSet, CurrentUserViewSet

# Router
router = routers.SimpleRouter()
router.register(r"app", AppViewSet, "app")
router.register(r"auth", AuthViewSet, "auth")
router.register(r"self", CurrentUserViewSet, "self")
router.register("health", HealthViewSet, basename="health")

# Using variables to make testing easier
API_ROOT = "api"

# URLs
urlpatterns = [
    # Django
    path("robots.txt/", robots_txt),
    path("admin/", admin.site.urls),
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
    path(f"{API_ROOT}/v1/", include(router.urls)),
    path("", include("django_prometheus.urls")),
]

# Only add swagger info in specific environments
if settings.ENVIRONMENT in ["development", "staging", "test"]:
    urlpatterns += [
        path(f"{API_ROOT}/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            f"{API_ROOT}/swagger/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
    ]

# Match all and forward to react router on the front-end app.
urlpatterns += [re_path(r"^.*$", index)]

# Admin config
admin.site.site_header = mark_safe("<strong>Interface d'administration</strong>")
admin.site.index_title = (
    "Bienvenue sur l'interface d'administration de Django React Starter"
)
