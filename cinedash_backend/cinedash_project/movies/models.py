from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=150)  # required
    director = models.CharField(max_length=100, blank=True)
    releaseDate = models.DateField(blank=True)
    genre = models.CharField(max_length=50, blank=True)
    lastWatched = models.DateTimeField(blank=True)
    finishedWatching = models.BooleanField(blank=True)
    numOfTimesWatched = models.PositiveIntegerField(blank=True)
    inWishList = models.BooleanField(blank=True)

    def __str__(self):
        return f"{self.title} by {self.director}, {self.releaseDate}"