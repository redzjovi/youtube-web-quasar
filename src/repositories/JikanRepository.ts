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
  MovieSearchRequest,
  MovieSearchResponse,
  Pagination as MovieRepositoryPagination,
  ResponseError as MovieRepositoryResponseError,
  Video as MovieRepositoryVideo,
} from 'src/repositories/MovieRepository';

enum AiringStatus {
  CurrentlyAiring = 'Currently Airing',
  FinishedAiring = 'Finished Airing',
  NotYetAired = 'Not yet aired',
}

type Anime = {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: TrailerBase;
  title: string;
  title_english: null | string;
  title_japanese: null | string;
  title_synoyms: string[];
  type: null | AnimeType;
  source: null | string;
  episodes: null | number;
  status: null | AiringStatus;
  airing: boolean;
  aired: {
    from: null | string;
    to: null | string;
    prop: {
      from: null | string;
      to: null | string;
      string: null | string;
    };
  };
  duration: null | string;
  rating: null | AnimeAudienceRating;
  score: null | number;
  scored_by: null | number;
  rank: null | number;
  popularity: null | number;
  members: null | number;
  favorites: null | number;
  synopsis: null | string;
  background: null | number;
  season: null | Season;
  year: null | number;
  broadcast: Broadcast;
  producers: MallUrl[];
  licensors: MallUrl[];
  studios: MallUrl[];
  genres: MallUrl[];
  explicit_genres: MallUrl[];
  themes: MallUrl[];
  demographics: MallUrl[];
};

enum AnimeAudienceRating {
  G = 'G - All Ages',
  PG = 'PG - Children',
  PG13 = 'PG-13 - Teens 13 or older',
  R = 'R - 17+ (violence & profanity)',
  Rpus = 'R+ - Mild Nudity',
  Rx = 'Rx - Hentai',
}

type AnimeImage = {
  image_url: null | string;
  small_image_url: null | string;
  large_image_url: null | string;
};

type AnimeImages = {
  jpg: AnimeImage;
  webp: AnimeImage;
};

type AnimeMeta = {
  mal_id: number;
  url: string;
  images: AnimeImages;
  title: string;
};

enum AnimeOrderBy {
  MalId = 'mal_id',
  Title = 'title',
  Type = 'type',
  Rating = 'rating',
  StartDate = 'start_date',
  EndDate = 'end_date',
  Episodes = 'episodes',
  Score = 'score',
  ScoredBy = 'scored_by',
  Rank = 'rank',
  Popularity = 'popularity',
  Members = 'members',
  Favorites = 'favorites',
}

enum AnimeStatus {
  Airing = 'airing',
  Complete = 'complete',
  Upcoming = 'upcoming',
}

enum AnimeType {
  Movie = 'movie',
  Music = 'music',
  ONA = 'ona',
  OVA = 'ova',
  Special = 'special',
  TV = 'tv',
}

type Broadcast = {
  day: null | string;
  time: null | string;
  timezone: null | string;
  string: null | string;
};

type GetAnimeRecommendations = {
  data: {
    entry: AnimeMeta;
    url: string;
    votes: number;
  }[];
};

type GetAnimeSearchRequest = {
  page?: number;
  limit?: number;
  q?: string;
  type?: AnimeType;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: AnimeStatus;
  rating?: AnimeAudienceRating;
  swf?: boolean;
  genres?: string;
  genres_exclude?: string;
  order_by?: AnimeOrderBy;
  sort?: Sort;
  letter?: string;
  producers?: string;
};

type GetAnimeSearchResponse = {
  data: Anime[];
  pagination: Pagination;
};

type GetTopAnimeByIdResponse = {
  data: Anime;
};

type GetTopAnimeRequest = {
  type?: AnimeType;
  filter?: TopAnimeFilter;
  page?: number;
};

type GetTopAnimeResponse = {
  data: Anime[];
  pagination: Pagination;
};

type MallUrl = {
  MalId: number;
  Type: string;
  Name: string;
  Url: number;
};

type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

type ResponseError = {
  error: string;
  message: string;
};

enum Season {
  Fall = 'Fall',
  Spring = 'Spring',
  Summer = 'Summer',
  Winter = 'Winter',
}

enum Sort {
  Desc = 'desc',
  Asc = 'asc',
}

enum TopAnimeFilter {
  Airing = 'airing',
  Upcoming = 'upcoming',
  Bypopularity = 'bypopularity',
  Favorite = 'favorite',
}

type TrailerBase = {
  youtube_id: null | string;
  url: null | string;
  embed_url: null | string;
};

function animeMetaToMovie(request: AnimeMeta): MovieRepositoryMovie {
  return {
    id: String(request.mal_id),
    originalPoster: String(request.images.jpg.large_image_url),
    poster: String(request.images.jpg.image_url),
    releaseDate: '',
    title: request.title,
    totalView: Math.floor(Math.random() * 1000),
    videos: [],
  };
}

function animeToMovie(request: Anime): MovieRepositoryMovie {
  return {
    id: String(request.mal_id),
    originalPoster: String(request.images.jpg.large_image_url),
    poster: String(request.images.jpg.image_url),
    releaseDate: String(request.aired.from),
    title: request.title,
    totalView: Number(request.favorites),
    videos: [trailerBaseToVideo(request.trailer)],
  };
}

function paginationToPagination(
  request: Pagination
): MovieRepositoryPagination {
  return {
    total: request.items.total,
    currentPage: request.current_page,
    lastPage: request.last_visible_page,
  };
}

function trailerBaseToVideo(request: TrailerBase): MovieRepositoryVideo {
  return {
    id: String(request.youtube_id),
    title: '',
    url: 'https://www.youtube.com/embed/' + String(request.youtube_id),
    publishedAt: '',
  };
}

export default class JikanRepository implements MovieRepository {
  movieDetail(
    request: MovieRepositoryMovieDetailRequest
  ): Promise<MovieRepositoryMovieDetailResponse> {
    return new Promise((resolve, reject) => {
      api
        .get('https://api.jikan.moe/v4/anime/' + request.id)
        .then((r) => {
          const getTopAnimeByIdResponse = r.data as GetTopAnimeByIdResponse;
          resolve({
            data: animeToMovie(getTopAnimeByIdResponse.data),
          });
        })
        .catch((e) => {
          const getTopAnimeByIdResponse = e.response.data as ResponseError;
          reject({
            message: getTopAnimeByIdResponse.message,
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
          'https://api.jikan.moe/v4/anime/' + request.id + '/recommendations'
        )
        .then((r) => {
          const getAnimeRecommendations = r.data as GetAnimeRecommendations;
          resolve({
            data: getAnimeRecommendations.data.map((d) => {
              return animeMetaToMovie(d.entry);
            }),
            meta: {
              pagination: {
                total: 0,
                currentPage: 0,
                lastPage: 0,
              },
            },
          });
        })
        .catch((e) => {
          const getAnimeRecommendations = e.response.data as ResponseError;
          reject({
            message: getAnimeRecommendations.message,
          } as MovieRepositoryResponseError);
        });
    });
  }
  moviePopular(
    request: MovieRepositoryMoviePopularRequest
  ): Promise<MovieRepositoryMoviePopularResponse> {
    return new Promise((resolve, reject) => {
      api
        .get('https://api.jikan.moe/v4/top/anime', {
          params: {
            page: request.page,
          } as GetTopAnimeRequest,
        })
        .then((r) => {
          const getTopAnimeResponse = r.data as GetTopAnimeResponse;
          resolve({
            data: getTopAnimeResponse.data.map((anime) => {
              return animeToMovie(anime);
            }),
            meta: {
              pagination: paginationToPagination(
                getTopAnimeResponse.pagination
              ),
            },
          });
        })
        .catch((e) => {
          const getTopAnimeResponse = e.response.data as ResponseError;
          reject({
            message: getTopAnimeResponse.message,
          } as MovieRepositoryResponseError);
        });
    });
  }
  movieSearch(request: MovieSearchRequest): Promise<MovieSearchResponse> {
    return new Promise((resolve, reject) => {
      api
        .get('https://api.jikan.moe/v4/anime', {
          params: {
            page: request.page,
            q: request.query,
            order_by: AnimeOrderBy.Popularity,
            sort: Sort.Desc,
          } as GetAnimeSearchRequest,
        })
        .then((r) => {
          const getAnimeSearchResponse = r.data as GetAnimeSearchResponse;
          resolve({
            data: getAnimeSearchResponse.data.map((anime) => {
              return animeMetaToMovie(anime);
            }),
            meta: {
              pagination: paginationToPagination(
                getAnimeSearchResponse.pagination
              ),
            },
          });
        })
        .catch((e) => {
          const searchMovieResponse = e.response.data as ResponseError;
          reject({
            message: searchMovieResponse.message,
          } as MovieRepositoryResponseError);
        });
    });
  }
}
