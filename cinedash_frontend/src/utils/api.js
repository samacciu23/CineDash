import axios from 'axios';

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';

export const fetchMovieById = async (tmdbId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
};


export const getLoginStatus = async () => {
  try {
    const response = await axios.get('http://localhost:8000/login-status/');
    return response.data;
  } catch (error) {
    console.error('Error fetching login status: ', error);
    throw error;
  }
};


export function fetchAndSetMovieByType(type, setter) {
  fetch("http://localhost:8000/tmdb/movies/"+type)
        .then(res => res.json())
        .then(data => setter(data.results))
}