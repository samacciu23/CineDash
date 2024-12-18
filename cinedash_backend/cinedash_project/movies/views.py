from rest_framework import viewsets
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import Movie, Profile
from .serializers import MovieSerializer, ProfileSerializer
from .services.tmdb import TmdbApiService


def index_view(request):
    urls = {
        'api': '/api/',
        'api_movies': '/api/movies',
        'api_profiles': '/api/profiles',
        'tmdb_movies_id': '/tmdb/movies/11',    # choose any id, here 11 was used as an example
        'tmdb_movies_popular': 'tmdb/movies/popular/',
        'tmdb_movies_top_rated': 'tmdb/movies/top_rated/',
        'tmdb_movies_upcoming': 'tmdb/movies/upcoming/',
        'tmdb_posters_size_path': '/tmdb/posters/original/1E5baAaEse26fej7uHcjOgEE2t2.jpg',    # image_size options: original, w500; and choose any poster_path
    }
    return render(request, 'index.html', {'urls': urls,})


def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            profile = Profile(user=user)
            profile.save()
            try:
                test_movie = Movie.objects.get(id=1)
            except Movie.DoesNotExist:
                print("Test Movie not found.")
            test_movie.save()
            profile.add_movie(test_movie)
            login(request, user)
            return redirect('login')
    else:
        form = UserCreationForm()
    
    return render(request, 'signup.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('http://localhost:3000/')   # React Home Page
    else:
        form = AuthenticationForm()
    
    return render(request, 'login.html', {'form': form})


####### INTERNAL DATABASE FOR PRIVATE MOVIES #########

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


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
