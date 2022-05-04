<script lang="ts">
import useMovieDetail from 'src/composables/useMovieDetail';
import { date } from 'quasar';
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DesktopMovieDetailPage',
  setup() {
    const $route = useRoute();

    const movieDetail = useMovieDetail();

    onMounted(() => {
      movieDetail.get($route.params.id.toString());
    });

    return {
      date,
      movieDetail,
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
    </div>
  </q-page>
</template>
