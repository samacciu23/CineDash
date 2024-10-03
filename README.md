# CineDash

Project created by Samuele, Supriya, Anabil.

## TMDB API
This app uses an external API: "The Movie DataBase" (TMDB).

To make sure (REST) requests work properly, a .env file, containing an API key, needs to be added to the backend of the app.

To do so,
1. Create a TMDB account and get your API key at https://developer.themoviedb.org/docs/getting-started,
2. Go to the *cinedash_backend/cinedash_project* folder,
3. Add a .env file,
4. And, inside .env, write your API key like this:
```
TMDB_API_KEY = your_api_key_goes_here
```
\* Example of request url: https://api.themoviedb.org/3/movie/550?api_key={TMDB_API_KEY}

