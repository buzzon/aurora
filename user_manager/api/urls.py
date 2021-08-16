from django.urls import path
from rest_framework.authtoken import views

app_name = 'user_manager_api'
urlpatterns = [
    path('token_auth/', views.obtain_auth_token)
]
