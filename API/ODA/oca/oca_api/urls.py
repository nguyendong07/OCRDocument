import sys

sys.path.append("..")
from django.urls import path
from .views import OCRView
urlpatterns = [
  path('OCR', OCRView.as_view())
]