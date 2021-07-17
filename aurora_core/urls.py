from django.urls import path

from . import views

app_name = 'aurora_core'
urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.event_create, name='create_event'),
]
