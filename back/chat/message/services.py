from typing import Union, Tuple

from message.models import Message, Thread
from . import queries


def message_create(content: str, created_by_id: int, sent_to: list, thread_id: int = None) -> Tuple[Message, int]:
    if not thread_id:
        thread = Thread.objects.create()
        thread.participants.set([created_by_id] + sent_to)
        thread.save()
        thread_id = thread.id

    message = Message.objects.create(content=content, created_by_id=created_by_id, thread_id=thread_id)
    message.sent_to.set(sent_to)
    message.save()
    return message, thread_id


def thread_get_by_participants(participants: list) -> Union[Thread, None]:
    thread = queries.get_thread_with_participants(participants)
    return thread


def messages_get_by_thread(thread_id: int = None) -> Union[list, None]:
    if not thread_id:
        return None

    return Message.objects.filter(thread_id=thread_id)
