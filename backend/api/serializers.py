from rest_framework import serializers
from .models import SavedResult

class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedResult
        fields = '__all__'