import { Movie, MovieSummary } from "./interfaces";

const baseUrl = `https://api.themoviedb.org/3`;
const apiKey = `api_key=${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`;

export const getDiscoverMovies = async () => {
  const res = await fetch(`${baseUrl}/discover/movie?${apiKey}`);
  return await res.json() as MovieSummary[]
}

export const getMovie = async (id: string) => {
  const res = await fetch(`${baseUrl}/movie/${id}?${apiKey}`);
  return await res.json() as Movie;
}
