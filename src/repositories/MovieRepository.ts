export type Movie = {
  id: string;
  originalPoster: string;
  poster: string;
  releaseDate: string;
  title: string;
  totalView: number;
  videos: Video[];
};

export type MovieDetailRecommendationRequest = {
  id: string;
  page: number;
};

export type MovieDetailRecommendationResponse = {
  data: Movie[];
  meta: {
    pagination: {
      total: number;
      currentPage: number;
      lastPage: number;
    };
  };
};

export type MovieDetailRequest = {
  id: string;
};

export type MovieDetailResponse = {
  data: Movie;
};

export type MoviePopularRequest = {
  page: number;
};

export type MoviePopularResponse = {
  data: Movie[];
  meta: {
    pagination: Pagination;
  };
};

export type MovieSearchRequest = {
  query: string;
  page: number;
};

export type MovieSearchResponse = {
  data: Movie[];
  meta: {
    pagination: {
      total: number;
      currentPage: number;
      lastPage: number;
    };
  };
};

export type Pagination = {
  total: number;
  currentPage: number;
  lastPage: number;
};

export type ResponseError = {
  message: string;
};

export type Video = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
};

export interface MovieRepository {
  movieDetail(request: MovieDetailRequest): Promise<MovieDetailResponse>;
  movieDetailRecommendation(
    request: MovieDetailRecommendationRequest
  ): Promise<MovieDetailRecommendationResponse>;
  moviePopular(request: MoviePopularRequest): Promise<MoviePopularResponse>;
  movieSearch(request: MovieSearchRequest): Promise<MovieSearchResponse>;
}
