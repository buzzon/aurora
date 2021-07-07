from django.contrib.auth.models import User
from django.db import models


class Label(models.Model):
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Event(models.Model):
    title = models.ForeignKey(Label, on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
