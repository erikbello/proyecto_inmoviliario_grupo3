from django.urls import path
from .views import UserList, UserDetail

urlpatterns = [
    path('users/', UserList.as_view()),              # GET / POST
    path('users/<int:pk>/', UserDetail.as_view()),   # DELETE
]