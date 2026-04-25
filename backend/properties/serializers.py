from rest_framework import serializers
from .models import Property


class PropertySerializer(serializers.ModelSerializer):

    # mostramos el username del dueño (solo lectura)
    owner_username = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Property
        fields = [
            'id',
            'title',
            'description',
            'price',
            'image',
            'city',
            'owner',
            'owner_username',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['owner', 'created_at', 'updated_at']