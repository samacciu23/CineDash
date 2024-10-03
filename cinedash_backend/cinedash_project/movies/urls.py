from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'movies', views.MovieViewSet, basename='movies')

urlpatterns = [
    path('', views.index, name="index"),
    path('tmdb/movies/<int:movie_id>/', views.get_movie_from_tmdb, name="movie_from_tmdb"),
    path('tmdb/movies/popular/', views.get_popular_movies_from_tmdb, name="popular_movies_from_tmdb"),
    path('tmdb/movies/top_rated/', views.get_top_rated_movies_from_tmdb, name="top_rated_movies_from_tmdb"),
    path('tmdb/movies/upcoming/', views.get_upcoming_movies_from_tmdb, name="upcoming_movies_from_tmdb"),
    path('tmdb/posters/<str:image_size>/<str:poster_path>/', views.get_poster_from_tmdb, name='poster_from_tmdb'),
    path('api/', include(router.urls)),
]
