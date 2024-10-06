import React, { useEffect, useState } from "react";
import "./home.css";
import MultiCarousel from 'react-multi-carousel'; // Correct import for MultiCarousel
import 'react-multi-carousel/lib/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel'; // Rename to avoid confusion
import { Link } from "react-router-dom";
import MovieList from "../../Components/movieList/movieList";


const Home = () => {

    const [popularMovies, setPopularMovies ] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0); // Track current slide index

    useEffect(() => {
        fetch("http://127.0.0.1:8000/tmdb/movies/popular/")
        .then(res => res.json())
        .then(data => {
            console.log(data.results)
            setPopularMovies(data.results)
        })
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/tmdb/movies/top_rated/")
        .then(res => res.json())
        .then(data => setTopRatedMovies(data.results))
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/tmdb/movies/upcoming/")
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
                                    <img src={`http://127.0.0.1:8000/tmdb/posters/original${movie && movie.backdrop_path}` } alt={movie.title} />
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
            </div>
            <div>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span className="carousel_tittle">Top Rated Movies</span></Link>
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
            </div>              
                
            <div>    
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span className="carousel_tittle">Upcoming Movies</span></Link>
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