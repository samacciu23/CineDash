import requests
from django.conf import settings

class TmdbApiService:
    def __init__(self):
        self.api_base_url = settings.TMDB_API_BASE_URL
        self.api_key = settings.TMDB_API_KEY
        self.timeout = 10


    def _get_headers(self):
        """Return the default headers including API key if needed."""

        return {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
        }


    def _handle_response(self, response):
        """Handle the API response, including error handling."""

        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            raise ValueError("Resource not found")
        elif response.status_code == 500:
            raise ValueError("Internal server error from the API")
        else:
            response.raise_for_status()


    def get_movie(self, movie_id):
        """Method to get a movie from the TMDB API"""

        url = f"{self.api_base_url}movie/{movie_id}?api_key={self.api_key}"

        try:
            response = requests.get(url, headers=self._get_headers(), timeout=self.timeout)
            return self._handle_response(response)
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Failed to connect to the API: {e}")
