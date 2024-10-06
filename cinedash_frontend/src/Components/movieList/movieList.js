import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = ({ type: propType }) => {
    const [movieList, setMovieList] = useState([]);
    const { type: urlType } = useParams();  // Get type from URL if available
  
    // Prioritize `propType` (from parent), fallback to `urlType` (from URL), default to 'popular'
    const type = propType || urlType || "popular";
  
    const getData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/tmdb/movies/${type}`
        );
        const data = await res.json();
        setMovieList(data.results || []);  // Set results, fallback to empty array if none
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Fetch movies based on the `type` (either from props or URL)
    useEffect(() => { getData() }, [type]);
  
    return (
      <div className="movie__list">
        <h2 className="list__title">{type.toUpperCase()}</h2>
        <div className="list__cards">
          {movieList.map((movie) => (
            <Cards key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  };
  
  export default MovieList;
  