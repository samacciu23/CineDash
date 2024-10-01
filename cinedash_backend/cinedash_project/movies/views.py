from rest_framework import views, viewsets
from django.http import JsonResponse
from django.shortcuts import render
from .models import Movie
from .serializers import MovieSerializer
from .services.tmdb import TmdbApiService


def index(request):
    internal_urls = {
        'api': '/api/',
        'movies': '/api/movies',
    }
    tmdb_urls = {
        'tmdb_movie_11': '/tmdb/11' 
    }
    return render(request, 'index.html', {'internal_urls': internal_urls, 'tmdb_urls': tmdb_urls})


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


def get_movie_from_tmdb(request, movie_id):
    tmdb_api_service = TmdbApiService()
    try:
        movie_data = tmdb_api_service.get_movie(movie_id)
        return JsonResponse(movie_data)
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except ConnectionError as e:
        return JsonResponse({'error': str(e)}, status=500)
