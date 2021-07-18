from django.forms import HiddenInput
from django.shortcuts import render, redirect
from aurora_core.forms import EventForm
from schedule.models import Label, Event


def index(request):
    user = request.user
    return render(request, 'aurora_core/index.html', {'user': user})


def event_create(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            qwe = form.data.get('id', None)
            if qwe is None:
                event = form.save(commit=False)
                event.owner = request.user
                event.save()
            else:
                event = Event.objects.get(id=qwe)
                event.description = form.cleaned_data.get('description', event.description)
                event.label = form.cleaned_data.get('label', event.label)
                event.save()
            return redirect('aurora_core:index')
    else:
        form = EventForm(request.GET)
        form.is_valid()
        form.fields['date'].widget = HiddenInput()
    return render(request, 'aurora_core/events_form.html', {'form': form, 'labels': Label.objects.filter(owner=request.user)})
