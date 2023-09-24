import React, { useState, useEffect } from "react";
import "./movies.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Movis = () => {
  const [moviesLE, setMoviesLE] = useState([]);
  const [showMore, setShowMore] = useState(1);
  const apiKey = "787c5e7e77c1cd35e7a5853c237ec606";

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${showMore}`
      );

      if (response.status === 200) {
        return response.data.results;
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const loadMoreMovies = () => {
    // Increment showMore when the "Show more" button is clicked
    setShowMore(showMore + 1);
  };

  useEffect(() => {
    
    fetchMovies().then((data) => {
      setMoviesLE((prevMovies) => [...prevMovies, ...data]); 
    });
  }, [showMore]); 

  return (
    <div className="all">
      
      <h1>Our Movies</h1>
      <div className="movies">
        {moviesLE.map((movie) => (
          <div key={movie.id} className="movie">
            {movie.poster_path && (
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              </Link>
            )}
            <h3 className="moves_caed_title">{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
      <button className="more" onClick={loadMoreMovies}>
        Show more
      </button>
    </div>
  );
};

export default Movis;
