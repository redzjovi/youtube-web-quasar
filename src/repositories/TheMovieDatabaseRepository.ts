import { api } from 'src/boot/axios';
import {
  Movie as MovieRepositoryMovie,
  MoviePopularRequest as MovieRepositoryMoviePopularRequest,
  MoviePopularResponse as MovieRepositoryMoviePopularResponse,
  MovieRepository,
  ResponseError as MovieRepositoryResponseError,
} from 'src/repositories/MovieRepository';

type MovieListResult = {
  poster_path: null | string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  title: string;
  backdrop_path: null | string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

type MoviePopularRequest = {
  api_key: string;
  language: string;
  page: number;
  region: string;
};

type MoviePopularResponse = {
  page: number;
  results: MovieListResult[];
  total_results: number;
  total_pages: number;
};

type ResponseError = {
  status_message: string;
  status_code: number;
};

function movieListResultToMovie(
  request: MovieListResult
): MovieRepositoryMovie {
  return {
    id: String(request.id),
    originalPoster: 'https://image.tmdb.org/t/p/original' + request.poster_path,
    poster: 'https://image.tmdb.org/t/p/w500' + request.poster_path,
    releaseDate: request.release_date,
    title: request.title,
    totalView: Math.round(request.popularity),
  };
}

export default class TheMovieDatabaseRepository implements MovieRepository {
  moviePopular(
    request: MovieRepositoryMoviePopularRequest
  ): Promise<MovieRepositoryMoviePopularResponse> {
    return new Promise((resolve, reject) => {
      api
        .get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            page: request.page,
          } as MoviePopularRequest,
        })
        .then((r) => {
          const moviePopularResponse = r.data as MoviePopularResponse;
          resolve({
            data: moviePopularResponse.results.map((result) => {
              return movieListResultToMovie(result);
            }),
            meta: {
              pagination: {
                total: moviePopularResponse.total_results,
                currentPage: moviePopularResponse.page,
                lastPage: moviePopularResponse.total_pages,
              },
            },
          });
        })
        .catch((e) => {
          const moviePopularResponse = e.response.data as ResponseError;
          reject({
            message: moviePopularResponse.status_message,
          } as MovieRepositoryResponseError);
        });
    });
  }
}
