from django import forms

from schedule.models import Event


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['label', 'description', 'date']
        widgets = {
            'label': forms.Select(attrs={'class': 'form-select'}),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'style': 'height: 100px',
                'placeholder': "Описание"
            }),
        }

    # def is_valid(self):
    #