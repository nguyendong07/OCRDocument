from rest_framework import serializers
from .models import OCR


class ExtractImage(serializers.ModelSerializer):
    class Meta:
        model = OCR
        fields = ['src']
