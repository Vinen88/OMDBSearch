from django.db import models

# Create your models here.
# dont think I need this because we arent saving search results. can just pass through, though might be easier to use model to serialize object and add saved but eh
# class SearchResult(models.Model):
#     title = models.CharField(max_length=100)
#     year = models.CharField(max_length=10)
#     imdbID = models.CharField(max_length=20)
#     type = models.CharField(max_length=20)
#     poster = models.CharField(max_length=100)
#     saved = models.BooleanField(default=False)
#     def __str__(self) -> str:
#         return self.title
    
class SavedResult(models.Model):
    Title = models.CharField(max_length=100)
    Year = models.CharField(max_length=10)
    Rated = models.CharField(max_length=10, blank=True)
    Released = models.CharField(max_length=20, blank=True)
    Runtime = models.CharField(max_length=20, blank=True)
    Genre = models.CharField(max_length=100, blank=True)
    Director = models.CharField(max_length=100, blank=True)
    Writer = models.CharField(max_length=100, blank=True)
    Actors = models.CharField(max_length=100, blank=True)
    Plot = models.CharField(max_length=1000, blank=True)
    Language = models.CharField(max_length=100, blank=True)
    Country = models.CharField(max_length=100, blank=True)
    Awards = models.CharField(max_length=100, blank=True)
    Poster = models.CharField(max_length=250, blank=True)
    Ratings = models.JSONField(blank=True)
    Metascore = models.CharField(max_length=10, blank=True)
    imdbRating = models.CharField(max_length=10, blank=True)
    imdbVotes = models.CharField(max_length=20, blank=True)
    imdbID = models.CharField(max_length=20, unique=True)
    Type = models.CharField(max_length=20, blank=True)
    DVD = models.CharField(max_length=20, blank=True)
    BoxOffice = models.CharField(max_length=20, blank=True)
    Production = models.CharField(max_length=100, blank=True)
    Website = models.CharField(max_length=100, blank=True)
    saved = models.BooleanField(default=True)
    Response = models.CharField(max_length=10) #idk why its documented as wanted saving this is kinda silly
    
    def __str__(self) -> str:
        return self.Title