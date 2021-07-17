from django.forms import HiddenInput
from django.shortcuts import render, redirect
from aurora_core.forms import EventForm


def index(request):
    user = request.user
    return render(request, 'aurora_core/index.html', {'user': user})


def event_create(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.owner = request.user
            event.save()
            return redirect('aurora_core:index')
    else:
        form = EventForm(request.GET)
        form.fields['date'].widget = HiddenInput()
    return render(request, 'aurora_core/events_form.html', {'form': form})
