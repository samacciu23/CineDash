from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'movies', views.MovieViewSet, basename='movies')

urlpatterns = [
    path('', views.index, name="index"),
    path('tmdb/<int:movie_id>/', views.get_movie_from_tmdb, name="movie_from_tmdb"),
    path('api/', include(router.urls)),
]
