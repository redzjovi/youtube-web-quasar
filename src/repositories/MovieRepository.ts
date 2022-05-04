export type Movie = {
  id: string;
  originalPoster: string;
  poster: string;
  releaseDate: string;
  title: string;
  totalView: number;
};

export type MoviePopularRequest = {
  page: number;
};

export type MoviePopularResponse = {
  data: Movie[];
  meta: {
    pagination: {
      total: number;
      currentPage: number;
      lastPage: number;
    };
  };
};

export type ResponseError = {
  message: string;
};

export interface MovieRepository {
  moviePopular(request: MoviePopularRequest): Promise<MoviePopularResponse>;
}
