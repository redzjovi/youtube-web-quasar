<script lang="ts">
import useMovieSearch from 'src/composables/useMovieSearch';
import { date } from 'quasar';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MobileResultsPage',
  setup() {
    const $route = useRoute();

    const movieSearch = useMovieSearch();

    const moreDialog = ref(false);

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
      moreDialog,
      loadMore,
    };
  },
});
</script>

<template>
  <q-page>
    <div>
      <q-card
        class="q-mb-md"
        flat
        square
        v-for="movie in movieSearch.$state.data"
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
      <div v-intersection="loadMore"></div>
    </div>
    <div class="text-center" v-if="movieSearch.$state.loadMoreLoading">
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
