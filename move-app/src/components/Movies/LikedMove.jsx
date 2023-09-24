
import React from 'react';

const LikedMovies = ({ likedMovies }) => {
  return (
    <div>
      <h1>Liked Movies</h1>
      {likedMovies.length > 0 ? (
        likedMovies.map((movie) => (
          <div key={movie.id} className="movie">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            )}
            <h3 className="movie_card_title">{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))
      ) : (
        <p>No liked movies yet.</p>
      )}
    </div>
  );
};

export default LikedMovies;
