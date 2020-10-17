from functools import reduce
from typing import Union
from django.db import models

from message.models import Thread


def get_thread_with_participants(participants: list) -> Union[Thread, None]:
    initial_qs = Thread.objects.annotate(cnt=models.Count('participants')).filter(cnt=len(participants))
    thread = reduce(lambda qs, pk: qs.filter(participants=pk), participants, initial_qs)
    return thread.first()
