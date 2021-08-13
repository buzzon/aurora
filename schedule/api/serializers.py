from rest_framework import serializers
from schedule.models import Event, Label


class LabelSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Label
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    label = LabelSerializer()

    class Meta:
        model = Event
        fields = "__all__"
