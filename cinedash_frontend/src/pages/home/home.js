import React, { useEffect, useState } from "react";
import "./home.css";
import MultiCarousel from 'react-multi-carousel'; // Correct import for MultiCarousel
import 'react-multi-carousel/lib/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel'; // Rename to avoid confusion
import { Link } from "react-router-dom";



const Home = () => {

    const [popularMovies, setPopularMovies ] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0); // Track current slide index

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

    return (
        <>
            <div className="poster">
                <ResponsiveCarousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}` } alt={movie.title} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </ResponsiveCarousel>
                
                <h2>Top Rated Movies</h2>
                <MultiCarousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    infinite={true}
                    autoPlay={true}
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
                    {topRatedMovies.map(movie => (
                        <div key={movie.id} className="carousel-item">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="carousel-item-overlay">
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    ))}
                </MultiCarousel>
                
                
                
                <h2>Upcoming Movies</h2>
                <MultiCarousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all 0.5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    beforeChange={(nextSlide) => handleMultiCarouselChange(nextSlide)} // Sync change with state
                >
                    {upcomingMovies.map(movie => (
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
        </>
    )
}

export default Home