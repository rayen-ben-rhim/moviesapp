import axios from "axios";

const fetchMovies = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: "787c5e7e77c1cd35e7a5853c237ec606",
          page: 1,
        },
      }
    );

    if (response.status === 200) {
      return response.data.results;
      
    }
    
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export { fetchMovies };
