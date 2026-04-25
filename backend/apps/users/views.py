from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer


# 🔹 LISTAR Y CREAR
class UserList(APIView):

    # GET → traer usuarios
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    # POST → crear usuario
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔹 ELIMINAR POR ID
class UserDetail(APIView):

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None

    # DELETE → eliminar usuario
    def delete(self, request, pk):
        user = self.get_object(pk)

        if user is None:
            return Response({"error": "Usuario no existe"}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response({"message": "Usuario eliminado"}, status=status.HTTP_204_NO_CONTENT)