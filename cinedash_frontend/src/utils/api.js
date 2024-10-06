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


export async function fetchAndSetLoginStatus(setter) {
  await axios.get('http://localhost:8000/login-status/')
  .then(response => {
    setter(response.data.is_auth);
  })
  .catch(error => {
    console.error('Error fetching login status: ', error);
  })
};


export async function fetchAndSetMoviesByType(type, setter) {
  await axios.get("http://localhost:8000/tmdb/movies/"+type)
        .then(response => {
          setter(response.data.results || []);
          })
        .catch(error => {
          console.error('Error fetching movies by type: ', error);
        });
};


export async function handleLogout(setter) {
  await axios.post('http://localhost:8000/logout/', {})
  .then(response => {
      console.log('Logout POST response status: ', response.status);
      setter(false);
  })
  .catch(error => {
      console.error('Error handling logout: ', error);
  });
};

