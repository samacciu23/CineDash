// frontend/src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import './User.css';
import MultiCarousel from 'react-multi-carousel'; // Correct import for MultiCarousel
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import axios from 'axios';



const Accounts = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Retrieve user ID from local storage (or wherever you're storing it)
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const userName = JSON.parse(localStorage.getItem("user")).name;

  const [popularMovies, setPopularMovies ] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profiles/`);
        setProfile(response.data[0]); // Assuming user profile is at index 0
      } catch (err) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=8968a8562fbeb01f72838fd769289b99&language=en-US")
    .then(res => res.json())
    .then(data => setPopularMovies(data.results))
}, []);

useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=8968a8562fbeb01f72838fd769289b99&language=en-US")
    .then(res => res.json())
    .then(data => setTopRatedMovies(data.results))
}, []);

useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=8968a8562fbeb01f72838fd769289b99&language=en-US")
    .then(res => res.json())
    .then(data => setUpcomingMovies(data.results))
}, []);

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
        desktop: { breakpoint: { max: 768, min: 768 }, items: 4 },
        tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

   // Handle slide change for both carousels
   const handleMultiCarouselChange = (nextSlide) => {
    setCurrentSlide(nextSlide);
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div>
        <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span className="carousel_tittle">Top Rated Movies</span></Link>
        <MultiCarousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 0.5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            selectedItem={currentSlide} // Control the selected item
            onChange={(index) => setCurrentSlide(index)} // Update currentSlide on change
        >
            {profile.topRatedMovies.map(movie => (
                <div key={movie.id} className="carousel-item">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="carousel-item-overlay">
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            ))}
        </MultiCarousel>
    </div>
    <div>
      <h4>Welcome {userName}</h4>
      <h3>Continue Watching for {userName}</h3>
      <ul>
        {profile.watching.map(movie => (
          <li key={movie.tmdb_id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Your Next Watch</h3>
      <ul>
        {profile.next_watch.map(movie => (
          <li key={movie.tmdb_id}>{movie.title}</li>
        ))}
      </ul>
      <h3>New on CineDash</h3>
      <ul>
        {profile.wishlist.map(movie => (
          <li key={movie.tmdb_id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Wishlist</h3>
      <ul>
        {profile.wishlist.map(movie => (
          <li key={movie.tmdb_id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Top 10 trending movies</h3>
      <ul>
        {profile.trending.map(movie => (
          <li key={movie.tmdb_id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Romantic Favorites</h3>
      <ul>
        {profile.Romantic_favorites.map(movie => (
          <li key={movie.tmdb_id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Watched Movies</h3>
      <ul>
        {profile.watched_movies.map(movie => (
          <li key={movie.tmdb_id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Suggestions</h3>
      <ul>
        {profile.suggestions.map(movie => (
          <li key={movie.tmdb_id}>{movie.title}</li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Accounts;
