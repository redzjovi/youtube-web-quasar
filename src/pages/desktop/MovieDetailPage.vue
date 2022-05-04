<script lang="ts">
import useMovieDetail from 'src/composables/useMovieDetail';
import useMovieDetailRecommendation from 'src/composables/useMovieDetailRecommendation';
import { date } from 'quasar';
import { defineComponent, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DesktopMovieDetailPage',
  setup() {
    const $route = useRoute();

    const movieDetail = useMovieDetail();
    const movieDetailRecommendation = useMovieDetailRecommendation();

    const movieDetailRecommendationLoadMore = (
      entry: IntersectionObserverEntry
    ) => {
      if (
        movieDetailRecommendation.$state.page >=
        movieDetailRecommendation.$state.lastPage
      ) {
        return;
      }
      if (entry.isIntersecting) {
        movieDetailRecommendation.loadMore(String($route.params.id));
      }
    };

    onMounted(() => {
      movieDetail.get(String($route.params.id));
      movieDetailRecommendation.get(String($route.params.id));
    });

    watch(
      () => $route.params.id,
      async (newId) => {
        if (newId) {
          movieDetail.get(String(newId));
          movieDetailRecommendation.stateReset();
          movieDetailRecommendation.get(String(newId));
        }
      }
    );

    return {
      date,
      movieDetail,
      movieDetailRecommendation,
      movieDetailRecommendationLoadMore,
    };
  },
});
</script>

<template>
  <q-page>
    <div class="q-pa-md row">
      <div class="col-md-9">
        <template v-if="movieDetail.$state.data">
          <div v-if="movieDetail.$state.data.videos.length > 0">
            <q-video
              :ratio="16 / 9"
              :src="movieDetail.$state.data.videos[0].url"
            />
          </div>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6">
                  {{ movieDetail.$state.data.title }}
                </q-item-label>
                <q-item-label caption>
                  {{
                    date.formatDate(
                      Date.parse(movieDetail.$state.data.releaseDate),
                      'MMM DD, YYYY'
                    )
                  }}
                </q-item-label>
              </q-item-section>
              <q-item-section top side>
                <div>
                  <q-btn
                    flat
                    icon="o_thumb_up"
                    :label="movieDetail.$state.data.totalView"
                  />
                  <q-btn flat icon="o_thumb_down" label="DISLIKE" />
                  <q-btn flat icon="o_share" label="SHARE" />
                  <q-btn flat icon="playlist_add" label="SAVE" />
                  <q-btn flat icon="more_horiz" round />
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </template>
      </div>
      <div class="col-md-3">
        <q-list>
          <q-item
            v-for="movie in movieDetailRecommendation.$state.data"
            :key="movie.id"
            :to="{ name: 'desktop-movie-detail', params: { id: movie.id } }"
          >
            <q-item-section class="col-md-5">
              <q-img
                fit="contain"
                :alt="movie.title"
                :ratio="16 / 9"
                :src="movie.poster"
              />
            </q-item-section>
            <q-item-section class="col-md-7" top>
              <q-item-label>{{ movie.title }}</q-item-label>
              <q-item-label caption>
                {{ movie.totalView }} views •
                {{
                  date.formatDate(Date.parse(movie.releaseDate), 'MMM DD, YYYY')
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <div v-intersection="movieDetailRecommendationLoadMore"></div>
        </q-list>
        <div
          class="text-center"
          v-if="movieDetailRecommendation.$state.loadMoreLoading"
        >
          <q-spinner size="md" />
        </div>
      </div>
    </div>
  </q-page>
</template>
