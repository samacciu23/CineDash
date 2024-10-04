from django.db import models
from django.contrib.auth.models import User


class Movie(models.Model):
    title = models.CharField(max_length=150)  # required
    director = models.CharField(max_length=100, default="", blank=True)
    releaseDate = models.DateField(default="2000-01-01", blank=True)
    genre = models.CharField(max_length=50, default="", blank=True)
    watching = models.BooleanField(default=False)  
    watched = models.BooleanField(default=False)   
    inWishlist = models.BooleanField(default=False)
    # lastWatched = models.DateTimeField(blank=True)
    # finishedWatching = models.BooleanField(blank=True)
    # numOfTimesWatched = models.PositiveIntegerField(blank=True)
    # inWishList = models.BooleanField(blank=True)

    def __str__(self):
        return f"{self.title} by {self.director}, {self.releaseDate}"
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None, primary_key=True)
    movies = models.ManyToManyField(Movie, blank=True)


    def __str__(self):
        return self.user.username
    
