from django.urls import path
from .views import MessageListAPIView, MessageDetailAPIView, ChannelListAPIView, ChannelDetailAPIView

urlpatterns = [
    path('messages/<int:pk>/', MessageDetailAPIView.as_view()),
    path('channels/<int:pk>/messages/', MessageListAPIView.as_view()),
    path('channels/<int:pk>/', ChannelDetailAPIView.as_view()),
    path('channels/', ChannelListAPIView.as_view()),
]