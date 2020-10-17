from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets

from user import services


class UserView(viewsets.ModelViewSet):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('id', 'username', 'email', 'first_name', 'last_name')

    queryset = User.objects.all().order_by('first_name')
    serializer_class = OutputSerializer

    def create(self, request, *args, **kwargs):
        class InputSerializer(serializers.Serializer):
            username = serializers.CharField(required=True)
            password = serializers.CharField(required=True)
            email = serializers.EmailField(required=True)
            first_name = serializers.CharField(required=True)
            last_name = serializers.CharField(required=True)

        input_serializer = InputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)

        user = services.user_create(**input_serializer.validated_data)
        token = services.user_get_token(user=user)

        return Response(
            {
                'token': token,
                'user': self.OutputSerializer(instance=user).data,
            },
            status=status.HTTP_201_CREATED,
        )

    @action(methods=['post'], detail=False)
    def login(self, request):
        class InputSerializer(serializers.Serializer):
            username = serializers.CharField(required=True)
            password = serializers.CharField(required=True)

        serializer = InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = services.user_authenticate(**serializer.validated_data)
        token = services.user_get_token(user=user)

        return Response(
            {
                'token': token,
                'user': self.OutputSerializer(instance=user).data,
            },
            status=status.HTTP_200_OK,
        )
