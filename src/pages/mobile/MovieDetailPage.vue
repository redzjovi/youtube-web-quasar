<script lang="ts">
import useMovieDetail from 'src/composables/useMovieDetail';
import useMovieDetailRecommendation from 'src/composables/useMovieDetailRecommendation';
import { date } from 'quasar';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MovieDetailPage',
  setup() {
    const $route = useRoute();

    const movieDetail = useMovieDetail();
    const movieDetailRecommendation = useMovieDetailRecommendation();
    const moreDialog = ref(false);

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
      moreDialog,
      movieDetailRecommendationLoadMore,
    };
  },
});
</script>

<template>
  <q-page>
    <template v-if="movieDetail.$state.data">
      <q-card flat square>
        <div v-if="movieDetail.$state.data.videos.length > 0">
          <q-video
            :ratio="16 / 9"
            :src="movieDetail.$state.data.videos[0].url"
          />
        </div>
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
        </q-item>
        <q-tabs align="justify" dense indicator-color="white" no-caps>
          <q-tab icon="o_thumb_up" :label="movieDetail.$state.data.totalView" />
          <q-tab icon="o_thumb_down" label="Dislike" />
          <q-tab icon="o_share" label="Share" />
          <q-tab icon="o_playlist_add" label="Save" />
          <q-tab icon="o_flag" label="Report" />
        </q-tabs>
      </q-card>
    </template>
    <div>
      <q-card
        class="q-mb-md"
        flat
        square
        v-for="movie in movieDetailRecommendation.$state.data"
        :key="movie.id"
      >
        <router-link
          :to="{ name: 'mobile-movie-detail', params: { id: movie.id } }"
        >
          <q-img
            fit="contain"
            :alt="movie.title"
            :ratio="16 / 9"
            :src="movie.poster"
          />
        </router-link>
        <q-list>
          <q-item>
            <q-item-section>
              <router-link
                :to="{
                  name: 'mobile-movie-detail',
                  params: { id: movie.id },
                }"
              >
                <q-item-label>{{ movie.title }}</q-item-label>
                <q-item-label caption>
                  {{ movie.totalView }} views •
                  {{
                    date.formatDate(
                      Date.parse(movie.releaseDate),
                      'MMM DD, YYYY'
                    )
                  }}
                </q-item-label>
              </router-link>
            </q-item-section>
            <q-item-section side top>
              <q-btn
                dense
                flat
                icon="more_vert"
                round
                @click="moreDialog = true"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <div v-intersection="movieDetailRecommendationLoadMore"></div>
    </div>
    <div
      class="text-center"
      v-if="movieDetailRecommendation.$state.loadMoreLoading"
    >
      <q-spinner size="md" />
    </div>
    <q-dialog full-width v-model="moreDialog">
      <q-card square>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Save to Watch later</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="moreDialog = false">
          <q-item-section>
            <q-item-label>Cancel</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>
  </q-page>
</template>
