from django.urls import path, include
from rest_framework.routers import DefaultRouter
from message import views

router = DefaultRouter()
router.register(r'messages', views.MessageView)

urlpatterns = [
    path('api/', include(router.urls))
]