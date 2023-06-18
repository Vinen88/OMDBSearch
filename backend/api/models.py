from django.db import models

# Create your models here.
class SearchResult(models.Model):
    title = models.CharField(max_length=100)
    year = models.CharField(max_length=10)
    imdbID = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    poster = models.CharField(max_length=100)
    saved = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.title