import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoveDetail.css";
import Movis from "./Movis";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    const apiKey = "787c5e7e77c1cd35e7a5853c237ec606";
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const img_backdropStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  const liks = {
    fill: "#ffffff",
  };
  const handleClick = () => {
    // Toggle the isClicked state when the element is clicked
    setLike(!liks);
  };
  return (
    <div>
      <div className="detail_img_bg" style={img_backdropStyle}></div>
      <div className="detail_containt">
        <div className="detail_decrep">
          <h1 className="title_detail">
            {movie.title} ({movie.release_date})
          </h1>
          <p className="vote">Vote Average: {movie.vote_average}</p>
          <button className="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4  h-6"
              onClick={handleClick}
              style={like ? liks : null}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          <p className="overvew">
            {" "}
            <p className="overvew_title">Overvew</p>
            {movie.overview}
          </p>
        </div>
        <div className="poser_detail">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={`${movie.title} Backdrop`}
            className="poser_detail_img"
          />
        </div>
      </div>
      <div className="all_2">
        <Movis />
      </div>
    </div>
  );
};

export default MovieDetail;
