<script lang="ts">
import useMoviePopular from 'src/composables/useMoviePopular';
import { date } from 'quasar';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'DesktopIndexPage',
  setup() {
    const moviePopular = useMoviePopular();

    const loadMore = async (entry: IntersectionObserverEntry) => {
      if (moviePopular.$state.page >= moviePopular.$state.lastPage) {
        return;
      }
      if (entry.isIntersecting) {
        await moviePopular.loadMore();
      }
    };

    onMounted(() => {
      moviePopular.get();
    });

    return {
      date,
      moviePopular,
      loadMore,
    };
  },
});
</script>

<template>
  <q-page>
    <div class="q-col-gutter-md q-pa-md row">
      <div
        class="col-md-3 col-sm-4 col-xs-12"
        v-for="movie in moviePopular.$state.data"
        :key="movie.id"
      >
        <router-link
          :to="{ name: 'desktop-movie-detail', params: { id: movie.id } }"
        >
          <q-card flat square>
            <q-img
              fit="contain"
              :alt="movie.title"
              :ratio="16 / 9"
              :src="movie.poster"
            />
            <q-item>
              <q-item-section>
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
              </q-item-section>
            </q-item>
          </q-card>
        </router-link>
      </div>
      <div v-intersection="loadMore"></div>
    </div>
    <div class="text-center" v-if="moviePopular.$state.loadMoreLoading">
      <q-spinner size="md" />
    </div>
  </q-page>
</template>
