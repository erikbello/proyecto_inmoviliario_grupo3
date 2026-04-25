from django.http import JsonResponse
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from properties.views import PropertyViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

def home(request):
    return JsonResponse({
        "message": "API inmobiliaria funcionando mela"
    })

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='properties')

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    

    # API
    path('api/', include(router.urls)),

    # JWT (CORRECTO 100%)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)