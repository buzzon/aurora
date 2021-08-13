import django_filters

from schedule.models import Event


class EventFilter(django_filters.FilterSet):
    month = django_filters.NumberFilter(field_name='date', lookup_expr='month')
    year = django_filters.NumberFilter(field_name='date', lookup_expr='year')

    class Meta:
        model = Event
        fields = ['month', 'year', 'label']
