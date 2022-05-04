<script lang="ts">
import useMoviePopular from 'src/composables/useMoviePopular';
import { date } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'MobileIndexPage',
  setup() {
    const moviePopular = useMoviePopular();

    const moreDialog = ref(false);

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
        v-for="movie in moviePopular.$state.data"
        :key="movie.id"
      >
        <q-img
          fit="contain"
          :alt="movie.title"
          :ratio="16 / 9"
          :src="movie.poster"
        />
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>{{ movie.title }}</q-item-label>
              <q-item-label caption>
                {{ movie.totalView }} views •
                {{
                  date.formatDate(Date.parse(movie.releaseDate), 'MMM DD, YYYY')
                }}
              </q-item-label>
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
    </div>
    <div v-intersection="loadMore"></div>
    <div class="text-center" v-if="moviePopular.$state.loadMoreLoading">
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
