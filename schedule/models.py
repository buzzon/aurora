from django.contrib.auth.models import User
from django.db import models


class Label(models.Model):
    title = models.CharField(max_length=255)
    color = models.CharField(max_length=7)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Event(models.Model):
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    date = models.DateField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.date} {self.label} {self.description}"

