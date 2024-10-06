import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"
import { fetchAndSetMoviesByType } from "../../utils/api"

const MovieList = ({ type: propType }) => {
    const [movieList, setMovieList] = useState([]);
    const { type: urlType } = useParams();  // Get type from URL if available
  
    // Prioritize `propType` (from parent), fallback to `urlType` (from URL), default to 'popular'
    const type = propType || urlType || "popular";
  
    // Fetch movies based on the `type` (either from props or URL)
    useEffect(() => { fetchAndSetMoviesByType(type, setMovieList) }, [type]);
  
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
  