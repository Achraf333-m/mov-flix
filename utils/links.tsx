const API_KEY = process.env.NEXT_PUBLIC_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const links = {
  Trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  Originals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  TopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  Action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  Comedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  Horror: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  Romance: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  Documentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
};

export default links;