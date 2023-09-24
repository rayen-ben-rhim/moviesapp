import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movieList.css";
import MoviePopup from "../Movies/MoviePupap";
import LikedMovies from "./LikedMove"; // Import the MoviePopup component

const Movelist = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const apiKey = "787c5e7e77c1cd35e7a5853c237ec606";
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      );

      if (response.status === 200) {
        setTrendingMovies(response.data.results);
        setShowSlider(true); // Show the slider after fetching trending movies
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );

      if (response.status === 200) {
        setPopularMovies(response.data.results);
        console.log(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );

      if (response.status === 200) {
        setSearchedMovies(response.data.results);
        console.log(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching searched movies:", error);
    }
    setOpenSearch(true)
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchPopularMovies();
  }, []);

  const openPopup = (movie) => {
    setSelectedMovie(movie);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedMovie(null);
    setShowPopup(false);
  };
  const toggleLike = (movie) => {
    if (likedMovies.some((likedMovie) => likedMovie.id === movie.id)) {
      // If movie is already liked, remove it from likedMovies
      const updatedLikedMovies = likedMovies.filter(
        (likedMovie) => likedMovie.id !== movie.id
      );
      setLikedMovies(updatedLikedMovies);
    } else {
      // If movie is not liked, add it to likedMovies
      setLikedMovies([...likedMovies, movie]);
    }
  };

  const renderSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    };

    return (
      <Slider {...settings}>
        {trendingMovies.map((movie) => (
          <div key={movie.id} onClick={() => openPopup(movie)}>
            <div className="slide-content ">
              {movie.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={`${movie.title} Backdrop`}
                  className="backdrop "
                />
              )}
              <div className="overlay-text">
                <h3 className="baktitle">{movie.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <div>
      {showSlider && renderSlider()}
      <h1 className="title">Movie List</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {openSearch && (
        <div className="section">
          <h2>Reaserch</h2>
          <div className="movies">
            {searchedMovies.map((movie) => (
              <div
                key={movie.id}
                className="movie"
                onClick={() => openPopup(movie)}
              >
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
        </div>
      )}

      <div className="section">
        <h2>Trending Movies</h2>
        <div className="cards">
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="card">
              {movie.poster_path && (
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                  />
                </Link>
              )}
              <div className="des_" onClick={() => openPopup(movie)}>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
              </div>
              {/* Add a Like button */}
              <button onClick={() => toggleLike(movie)}>
                {likedMovies.some((likedMovie) => likedMovie.id === movie.id)
                  ? "Unlike"
                  : "Like"}
              </button>
              
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Popular Movies</h2>
        <div className="cards">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              className="card"
              onClick={() => openPopup(movie)}
            >
              {movie.poster_path && (
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                  />
                </Link>
              )}
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
      {showPopup && <MoviePopup movie={selectedMovie} onClose={closePopup} />}
    </div>
  );
};

export default Movelist;
