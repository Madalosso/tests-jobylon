from rest_framework import viewsets, serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response

from message import services
from message.models import Message, Thread


class MessageView(viewsets.ModelViewSet):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Message
            fields = ('id', 'content', 'created_by', 'created')

    queryset = Message.objects.all()
    serializer_class = OutputSerializer

    def create(self, request, *args, **kwargs):
        class InputSerializer(serializers.Serializer):
            content = serializers.CharField(required=True)
            created_by_id = serializers.IntegerField(required=True)
            sent_to = serializers.ListField(required=True)
            thread_id = serializers.IntegerField(required=False)

        input_serializer = InputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)

        message, thread_id = services.message_create(**input_serializer.validated_data)

        return Response({
            'message': self.OutputSerializer(instance=message).data,
            'thread_id': thread_id,
        }, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        class InputSerializer(serializers.Serializer):
            participants = serializers.ListField()

        input_serializer = InputSerializer(data=request.query_params)
        input_serializer.is_valid(raise_exception=True)

        thread_id = services.thread_get_by_participants(**input_serializer.validated_data)
        messages = services.messages_get_by_thread(thread_id)

        return Response(self.OutputSerializer(instance=messages, many=True).data, status=status.HTTP_200_OK)
