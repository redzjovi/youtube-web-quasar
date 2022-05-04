import { api } from 'src/boot/axios';
import {
  Movie as MovieRepositoryMovie,
  MovieDetailRecommendationRequest as MovieRepositoryMovieDetailRecommendationRequest,
  MovieDetailRecommendationResponse as MovieRepositoryMovieDetailRecommendationResponse,
  MovieDetailRequest as MovieRepositoryMovieDetailRequest,
  MovieDetailResponse as MovieRepositoryMovieDetailResponse,
  MoviePopularRequest as MovieRepositoryMoviePopularRequest,
  MoviePopularResponse as MovieRepositoryMoviePopularResponse,
  MovieRepository,
  MovieSearchRequest as MovieRepositoryMovieSearchRequest,
  MovieSearchResponse as MovieRepositoryMovieSearchResponse,
  ResponseError as MovieRepositoryResponseError,
  Video as MovieRepositoryVideo,
} from 'src/repositories/MovieRepository';

type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

type Genre = {
  id: number;
  name: string;
};

type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | BelongsToCollection;
  budget: number;
  genres: Genre[];
  id: number;
  imdb_id: null | string;
  original_language: string;
  original_title: string;
  overview: null | string;
  popularity: number;
  poster_path: null | string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: null | number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: null | string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: Video[];
  };
};

type MovieDetailRecommendationRequest = {
  api_key: string;
  language: string;
  page: number;
};

type MovieDetailRecommendationResponse = {
  page: number;
  results: MovieListResult[];
  total_results: number;
  total_pages: number;
};

type MovieDetailRequest = {
  api_key: string;
  language: string;
  append_to_response: null | string;
};

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

type ProductionCompany = {
  name: string;
  id: number;
  logo_path: null | string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type ResponseError = {
  status_message: string;
  status_code: number;
};

type SearchMovieRequest = {
  api_key: string;
  language: null | string;
  query: string;
  page: null | number;
  include_adult: null | boolean;
  region: null | string;
  year: null | number;
  primary_release_year: null | number;
};

type SearchMovieResponse = {
  page: number;
  results: MovieListResult[];
  total_results: number;
  total_pages: number;
};

type SpokenLanguage = {
  iso_3166_1: string;
  name: string;
};

type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

enum VideoSite {
  YouTube = 'YouTube',
}

function movieDetailToMovie(request: MovieDetail): MovieRepositoryMovie {
  return {
    id: String(request.id),
    originalPoster: 'https://image.tmdb.org/t/p/original' + request.poster_path,
    poster: 'https://image.tmdb.org/t/p/w500' + request.backdrop_path,
    releaseDate: request.release_date,
    title: request.title,
    totalView: Math.round(request.popularity),
    videos: request.videos.results.map((result) => {
      return movieDetailVideoToVideo(result);
    }),
  };
}

function movieDetailVideoToVideo(request: Video): MovieRepositoryVideo {
  let url = request.key;

  if (request.site == VideoSite.YouTube) {
    url = 'https://www.youtube.com/embed/' + request.key;
  }

  return {
    id: request.key,
    title: request.name,
    url: url,
    publishedAt: request.published_at,
  };
}

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
    videos: [],
  };
}

export default class TheMovieDatabaseRepository implements MovieRepository {
  movieDetail(
    request: MovieRepositoryMovieDetailRequest
  ): Promise<MovieRepositoryMovieDetailResponse> {
    return new Promise((resolve, reject) => {
      api
        .get('https://api.themoviedb.org/3/movie/' + request.id, {
          params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            append_to_response: 'images,videos',
          } as MovieDetailRequest,
        })
        .then((r) => {
          const movieDetailResponse = r.data as MovieDetail;
          resolve({
            data: movieDetailToMovie(movieDetailResponse),
          });
        })
        .catch((e) => {
          const movieDetailResponse = e.response.data as ResponseError;
          reject({
            message: movieDetailResponse.status_message,
          } as MovieRepositoryResponseError);
        });
    });
  }
  movieDetailRecommendation(
    request: MovieRepositoryMovieDetailRecommendationRequest
  ): Promise<MovieRepositoryMovieDetailRecommendationResponse> {
    return new Promise((resolve, reject) => {
      api
        .get(
          'https://api.themoviedb.org/3/movie/' +
            request.id +
            '/recommendations',
          {
            params: {
              api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
              page: request.page,
            } as MovieDetailRecommendationRequest,
          }
        )
        .then((r) => {
          const movieDetailRecommendationResponse =
            r.data as MovieDetailRecommendationResponse;
          resolve({
            data: movieDetailRecommendationResponse.results.map((result) => {
              return movieListResultToMovie(result);
            }),
            meta: {
              pagination: {
                total: movieDetailRecommendationResponse.total_results,
                currentPage: movieDetailRecommendationResponse.page,
                lastPage: movieDetailRecommendationResponse.total_pages,
              },
            },
          });
        })
        .catch((e) => {
          const movieDetailRecommendationResponse = e.response
            .data as ResponseError;
          reject({
            message: movieDetailRecommendationResponse.status_message,
          } as MovieRepositoryResponseError);
        });
    });
  }
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
  movieSearch(
    request: MovieRepositoryMovieSearchRequest
  ): Promise<MovieRepositoryMovieSearchResponse> {
    return new Promise((resolve, reject) => {
      api
        .get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: process.env.THE_MOVIE_DATABASE_API_KEY,
            query: request.query,
            page: request.page,
          } as SearchMovieRequest,
        })
        .then((r) => {
          const searchMovieResponse = r.data as SearchMovieResponse;
          resolve({
            data: searchMovieResponse.results.map((result) => {
              return movieListResultToMovie(result);
            }),
            meta: {
              pagination: {
                total: searchMovieResponse.total_results,
                currentPage: searchMovieResponse.page,
                lastPage: searchMovieResponse.total_pages,
              },
            },
          });
        })
        .catch((e) => {
          const searchMovieResponse = e.response.data as ResponseError;
          reject({
            message: searchMovieResponse.status_message,
          } as MovieRepositoryResponseError);
        });
    });
  }
}
