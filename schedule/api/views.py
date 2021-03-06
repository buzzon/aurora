from rest_framework import generics

from schedule.api.filters import EventFilter
from schedule.api.serializers import EventSerializer, LabelSerializer
from schedule.models import Event, Label

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'events': reverse('schedule_api:event_list', request=request, format=format),
        'labels': reverse('schedule_api:label_list', request=request, format=format),
    })


class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_class = EventFilter

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user).order_by('label')


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)


class LabelList(generics.ListCreateAPIView):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LabelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)


