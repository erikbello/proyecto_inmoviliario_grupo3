from django.db import models
from django.contrib.auth.models import User


class Property(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField(default="")
    price = models.DecimalField(max_digits=10, decimal_places=2)

    image = models.ImageField(upload_to='properties/', null=True, blank=True)

    # propietario (usuario que creó la propiedad)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="properties"
    )

    #  campos empresa (MUY IMPORTANTE)
    city = models.CharField(max_length=100, default="")
    address = models.CharField(max_length=255, default="")
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.city}"