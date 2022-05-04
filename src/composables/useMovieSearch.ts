import useMovieRepository from 'src/composables/useMovieRepository';
import {
  Movie,
  MovieSearchResponse,
  ResponseError,
} from 'src/repositories/MovieRepository';
import { reactive, ref } from 'vue';

export default () => {
  const movieRepository = useMovieRepository();

  const $state = reactive({
    data: ref<Movie[]>([]),
    getLoading: ref(false),
    lastPage: ref(0),
    loadMoreLoading: ref(false),
    page: ref(1),
    query: ref(''),
  });

  const get = (): Promise<MovieSearchResponse> => {
    $state.getLoading = true;
    return new Promise((resolve, reject) => {
      movieRepository
        .movieSearch({
          query: $state.query,
          page: $state.page,
        })
        .then((r) => {
          $state.data = r.data;
          $state.lastPage = r.meta.pagination.lastPage;
          $state.page = r.meta.pagination.currentPage;
          resolve(r);
        })
        .catch((e: ResponseError) => {
          reject(e);
        })
        .finally(() => {
          $state.getLoading = false;
        });
    });
  };

  const loadMore = (): Promise<MovieSearchResponse> => {
    $state.loadMoreLoading = true;
    return new Promise((resolve, reject) => {
      movieRepository
        .movieSearch({
          query: $state.query,
          page: $state.page + 1,
        })
        .then((r) => {
          $state.data = $state.data.concat(r.data);
          $state.lastPage = r.meta.pagination.lastPage;
          $state.page = r.meta.pagination.currentPage;
          resolve(r);
        })
        .catch((e: ResponseError) => {
          reject(e);
        })
        .finally(() => {
          $state.loadMoreLoading = false;
        });
    });
  };

  const stateReset = () => {
    $state.data = [];
    $state.page = 1;
  };

  return {
    $state,
    get,
    loadMore,
    stateReset,
  };
};
