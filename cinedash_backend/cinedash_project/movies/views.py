from rest_framework import viewsets
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from .models import Movie
from .serializers import MovieSerializer
from .services.tmdb import TmdbApiService


def index(request):
    urls = {
        'api': '/api/',
        'api_movies': '/api/movies',
        'tmdb_movies_id': '/tmdb/movies/11',
        'tmdb_posters_path': '/tmdb/posters/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
    }
    return render(request, 'index.html', {'urls': urls,})

####### INTERNAL DATABASE FOR PRIVATE MOVIES #########

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


####### EXTERNAL TMDB API FOR PUBLIC MOVIES #########

tmdb_api_service = TmdbApiService()


def get_movie_from_tmdb(request, movie_id):
    movie_response = tmdb_api_service.get_movie(movie_id)
    return JsonResponse(movie_response.json())
    

def get_poster_from_tmdb(request, poster_path):
    poster_response = tmdb_api_service.get_poster(poster_path)
    return HttpResponse(poster_response.content, content_type='image/jpeg')
