import requests
from django.conf import settings
from django.http import HttpResponse

class TmdbApiService:
    def __init__(self):
        self.api_movies_base_url = settings.TMDB_API_MOVIES_BASE_URL
        self.api_images_base_url = settings.TMDB_API_IMAGES_BASE_URL
        self.api_key = settings.TMDB_API_KEY
        self.timeout = 10


    def _get_headers(self):
        """Return the default headers including TMDB API key if needed."""

        return {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
        }


    def _handle_response(self, response):
        """Handle the TMDB API response, including error handling."""

        if response.status_code == 200:
            return response
        else:
            return HttpResponse(f'Failed to retrieve resource from TMDB API: {response.status_code}', status=response.status_code)


    def get_movie(self, movie_id):
        """Method to get a movie from the TMDB API"""

        url = f"{self.api_movies_base_url}/{movie_id}?api_key={self.api_key}"

        try:
            response = requests.get(url, headers=self._get_headers(), timeout=self.timeout)
            return self._handle_response(response)
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Failed to connect to the TMDB API: {e}")


    def get_poster(self, image_size, poster_path):
        """Method to get a poster from the TMDB API"""
    
        url = f"{self.api_images_base_url}/{image_size}/{poster_path}"

        try:
            response = requests.get(url, timeout=self.timeout)
            return self._handle_response(response)
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Failed to connect to the TMDB API: {e}")
        
    
    def get_popular_movies(self):
        """Method to get popular movies from the TMDB API"""
    
        url = f"{self.api_movies_base_url}/popular?api_key={self.api_key}"

        try:
            response = requests.get(url, headers=self._get_headers(), timeout=self.timeout)
            return self._handle_response(response)
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Failed to connect to the TMDB API: {e}")

    
    def get_top_rated_movies(self):
        """Method to get top rated movies from the TMDB API"""
    
        url = f"{self.api_movies_base_url}/top_rated?api_key={self.api_key}"

        try:
            response = requests.get(url, headers=self._get_headers(), timeout=self.timeout)
            return self._handle_response(response)
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Failed to connect to the TMDB API: {e}")
        
    
    def get_upcoming_movies(self):
        """Method to get upcoming movies from the TMDB API"""
    
        url = f"{self.api_movies_base_url}/upcoming?api_key={self.api_key}"

        try:
            response = requests.get(url, headers=self._get_headers(), timeout=self.timeout)
            return self._handle_response(response)
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Failed to connect to the TMDB API: {e}")