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
    
    class Meta:
        constraints = [
            models.CheckConstraint(
                check = ~models.Q(watching=True) | ~models.Q(watched=True),
                name = 'cannot_watch_and_have_watched'
            ),
        ]

    def __str__(self):
        return f"{self.title} by {self.director}, {self.releaseDate}"
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None, primary_key=True)
    movies = models.ManyToManyField(Movie, blank=True)

    def __str__(self):
        return self.user.username
    
    def add_movie(self, movie: Movie) -> None:
        self.movies.add(movie)

    def remove_movie(self, movie: Movie) -> None:
        self.movies.remove(movie)

    def has_watched(self, movie: Movie) -> bool:
        return movie in self.movies.filter(watched=True)
    
    def get_watched_movies(self) -> list[Movie]:
        return list(self.movies.filter(watched=True))

    def get_wishlist_movies(self) -> list[Movie]:
        return list(self.movies.filter(inWishlist=True))
    
    def get_watching_movies(self) -> list[Movie]:
        return list(self.movies.filter(watching=True))