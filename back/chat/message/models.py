from django.contrib.auth.models import User
from django.db import models
from django_extensions.db.models import TimeStampedModel


class Thread(TimeStampedModel):
    participants = models.ManyToManyField(User)


class Message(TimeStampedModel):
    content = models.TextField(max_length=2000)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages_sent')
    sent_to = models.ManyToManyField(User, related_name='messages_received')
