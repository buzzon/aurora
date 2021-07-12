from django.urls import path

from schedule.api import views

app_name = 'schedule_api'
urlpatterns = [
    path('', views.api_root, name='root'),
    path('events/', views.EventList.as_view(), name='event_list'),
    path('events/<int:pk>/', views.EventDetail.as_view(), name='event_detail'),
    path('labels/', views.LabelList.as_view(), name='label_list'),
    path('labels/<int:pk>/', views.LabelDetail.as_view(), name='label_detail'),
]
