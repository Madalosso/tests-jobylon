from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


def user_authenticate(*, username: str, password: str) -> User:
    user = authenticate(username=username, password=password)
    if not user:
        raise PermissionError("Invalid credentials")
    return user


def user_get_token(*, user: User) -> str:
    token, created = Token.objects.get_or_create(user=user)
    return token.key


def user_create(username: str, password: str, email: str, first_name: str, last_name: str) -> User:
    user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name,
                                    last_name=last_name)
    return user
