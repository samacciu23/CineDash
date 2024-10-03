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
        'tmdb_movies_id': '/tmdb/movies/11',    # choose any id, here 11 was used as an example
        'tmdb_movies_popular': 'tmdb/movies/popular/',
        'tmdb_movies_top_rated': 'tmdb/movies/top_rated/',
        'tmdb_movies_upcoming': 'tmdb/movies/upcoming/',
        'tmdb_posters_size_path': '/tmdb/posters/original/1E5baAaEse26fej7uHcjOgEE2t2.jpg',    # image_size options: original, w500; and choose any poster_path
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
    

def get_poster_from_tmdb(request, image_size, poster_path):
    poster_response = tmdb_api_service.get_poster(image_size, poster_path)
    return HttpResponse(poster_response.content, content_type='image/jpeg')


def get_popular_movies_from_tmdb(request):
    popular_movies_response = tmdb_api_service.get_popular_movies()
    return JsonResponse(popular_movies_response.json())


def get_top_rated_movies_from_tmdb(request):
    top_rated_movies_response = tmdb_api_service.get_top_rated_movies()
    return JsonResponse(top_rated_movies_response.json())


def get_upcoming_movies_from_tmdb(request):
    upcoming_movies_response = tmdb_api_service.get_upcoming_movies()
    return JsonResponse(upcoming_movies_response.json())
