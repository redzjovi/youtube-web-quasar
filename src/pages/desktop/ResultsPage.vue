<script lang="ts">
import useMovieSearch from 'src/composables/useMovieSearch';
import { date } from 'quasar';
import { defineComponent, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DesktopResultsPage',
  setup() {
    const $route = useRoute();

    const movieSearch = useMovieSearch();

    const loadMore = (entry: IntersectionObserverEntry) => {
      if (movieSearch.$state.page >= movieSearch.$state.lastPage) {
        return;
      }
      if (entry.isIntersecting) {
        movieSearch.loadMore();
      }
    };

    onMounted(() => {
      movieSearch.$state.query = String($route.query.search_query ?? '');
      movieSearch.get();
    });

    watch(
      () => $route.query.search_query,
      async (newSearchQuery) => {
        if (newSearchQuery) {
          movieSearch.$state.query = String(newSearchQuery ?? '');
          movieSearch.get();
        }
      }
    );

    return {
      date,
      movieSearch,
      loadMore,
    };
  },
});
</script>

<template>
  <q-page>
    <div class="justify-center row q-pa-md">
      <div
        class="col-md-8 col-sm-12 q-pa-sm"
        v-for="movie in movieSearch.$state.data"
        :key="movie.id"
      >
        <router-link
          :to="{ name: 'desktop-movie-detail', params: { id: movie.id } }"
        >
          <q-card flat>
            <q-card-section horizontal>
              <q-img
                class="col-4"
                fit="contain"
                :alt="movie.title"
                :ratio="16 / 9"
                :src="movie.poster"
              />
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-h6">
                      {{ movie.title }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ movie.totalView }} views •
                      {{
                        date.formatDate(
                          Date.parse(movie.releaseDate),
                          'MMM DD, YYYY'
                        )
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </router-link>
      </div>
      <div v-intersection="loadMore"></div>
    </div>
    <div class="text-center" v-if="movieSearch.$state.loadMoreLoading">
      <q-spinner size="md" />
    </div>
  </q-page>
</template>
