from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'movies', views.MovieViewSet, basename='movies')
router.register(r'profiles', views.ProfileViewSet, basename='profiles')


urlpatterns = [
    path('', views.index_view, name="index"),
    path('tmdb/movies/<int:movie_id>/', views.get_movie_from_tmdb, name="movie_from_tmdb"),
    path('tmdb/movies/<str:type>/', views.get_movies_by_type_from_tmdb, name="movies_by_type_from_tmdb"),
    path('tmdb/posters/<str:image_size>/<str:poster_path>/', views.get_poster_from_tmdb, name='poster_from_tmdb'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('login-status/', views.get_login_status, name="login_status"),
    path('api/', include(router.urls)),
]
