from django.db import models

# Create your models here.

from django.db import models


class OCR(models.Model):
    src = models.FileField(blank=True, null=True)

    def __str__(self):
        return self.src
