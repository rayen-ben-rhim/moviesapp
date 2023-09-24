import React from "react";
import "./MoveP.css";

const MoviePopup = ({ movie, onClose }) => {
  const backdropStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    
  };
  return (
    <div className="movie-popup" >
      <div className="popup-content" style={backdropStyle}>
        {movie && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
            <div className="desc">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
            <button className="close-button" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={onClose}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MoviePopup;
