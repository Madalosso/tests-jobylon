from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user import views

router = DefaultRouter()
router.register(r'users', views.UserView)

urlpatterns = [
    path('api/', include(router.urls))
]