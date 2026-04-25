from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Property
from .serializers import PropertySerializer


class PropertyViewSet(viewsets.ModelViewSet):

    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return Property.objects.all()

        return Property.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)