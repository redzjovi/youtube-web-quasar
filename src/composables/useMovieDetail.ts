import useMovieRepository from 'src/composables/useMovieRepository';
import {
  Movie,
  MovieDetailResponse,
  ResponseError,
} from 'src/repositories/MovieRepository';
import { reactive, ref } from 'vue';

export default () => {
  const movieRepository = useMovieRepository();

  const $state = reactive({
    data: ref<null | Movie>(null),
    loading: ref(false),
  });

  const get = (id: string): Promise<MovieDetailResponse> => {
    $state.loading = true;
    return new Promise((resolve, reject) => {
      movieRepository
        .movieDetail({
          id,
        })
        .then((r) => {
          $state.data = r.data;
          resolve(r);
        })
        .catch((e: ResponseError) => {
          reject(e);
        })
        .finally(() => {
          $state.loading = false;
        });
    });
  };

  return {
    $state,
    get,
  };
};
