from rest_framework import serializers

from .models import Message, Channel


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'

    # def get_is_owner(self, obj):
    #     return obj.user == self.request.user
    #     #return (now() - obj.date_joined).days

    def get_access_type(self, obj):
        if obj.user == self.request.user:
            return 'owner'
        elif self.request.user.is_staff:
            return 'staff'

        return 'read_only'

class ChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Channel
        fields = '__all__'