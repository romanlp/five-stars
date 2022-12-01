export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: { id: number, name: string }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: { id: number, name: string, logo_path: string | null, origin_country: string }[];
  production_countries: { iso_3166_1: string, name: string }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: { iso_639_1: string, name: string }[];
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieSummary = Pick<Movie,
  'poster_path' |
  'adult' |
  'overview' |
  'release_date' |
  'id' |
  'original_title' |
  'original_language' |
  'title' |
  'backdrop_path' |
  'popularity' |
  'vote_count' |
  'vote_average'> & { genre_ids: number[] };
