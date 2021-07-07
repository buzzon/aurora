from django.contrib import admin

from schedule.models import Event, Label

admin.site.register(Event)
admin.site.register(Label)
