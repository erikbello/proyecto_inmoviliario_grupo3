from django.db import models

class User(models.Model):
    # 'verbose_name' es lo que hace que en el panel diga "Nombre"
    name = models.CharField(max_length=100, verbose_name="Nombre")

    class Meta:
        # Esto traduce los títulos de las tablas en el administrador de Django
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.name