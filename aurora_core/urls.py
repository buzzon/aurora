from django.urls import path

from . import views

app_name = 'aurora_core'
urlpatterns = [
    path('', views.index, name='index'),
]
