from django.db import models
from django.conf import settings
# Create your models here.


class Room(models.Model):
    name = models.CharField(max_length=225)

    def __str__(self):
        return self.name


class Chat(models.Model):
    text = models.TextField()
    # a room will have many chats but a chat can only have one room
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.text[:50]