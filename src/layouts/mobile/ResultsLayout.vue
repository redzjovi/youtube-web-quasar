<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'MobileResultsLayout',
  setup() {
    const $route = useRoute();
    const $router = useRouter();

    const search = ref('');
    const searchDialog = ref(false);
    const moreDialog = ref(false);

    const searchSubmit = () => {
      if (!search.value) {
        return;
      }
      $router.push({
        name: 'mobile-results',
        query: { search_query: search.value },
      });
    };

    onMounted(() => {
      search.value = String($route.query.search_query ?? '');
    });

    watch(
      () => $route.query.search_query,
      (newSearchQuery) => {
        search.value = String(newSearchQuery ?? '');
      }
    );

    return {
      search,
      searchDialog,
      moreDialog,
      searchSubmit,
    };
  },
});
</script>

<template>
  <q-layout view="lHh lpr lFf">
    <q-header bordered class="bg-white text-black" reveal>
      <q-toolbar>
        <q-btn flat icon="o_smart_display" :to="{ name: 'mobile' }" />
        <q-input
          class="col"
          dense
          filled
          placeholder="Search YouTube"
          readonly
          v-model="search"
          @click="searchDialog = true"
        >
          <template v-slot:append>
            <q-icon name="o_tune" />
          </template>
        </q-input>
        <q-dialog full-width position="top" v-model="searchDialog">
          <q-card>
            <q-form @submit="searchSubmit">
              <q-toolbar>
                <q-btn
                  flat
                  icon="arrow_back"
                  round
                  @click="searchDialog = false"
                />
                <q-input
                  class="col"
                  dense
                  placeholder="Search YouTube"
                  v-model="search"
                >
                  <template v-slot:after>
                    <q-btn
                      flat
                      icon="close"
                      round
                      v-if="search"
                      @click="search = ''"
                    />
                    <q-btn flat icon="search" round />
                    <q-btn flat icon="mic" round v-if="!search" />
                  </template>
                </q-input>
              </q-toolbar>
            </q-form>
          </q-card>
        </q-dialog>
        <q-btn flat icon="mic" round />
        <q-btn flat icon="more_vert" round @click="moreDialog = true" />
        <q-dialog full-width v-model="moreDialog">
          <q-card square>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Sign In</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Settings</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Playback Settings</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Your data in YouTube</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Feedback</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Help</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="moreDialog = false">
              <q-item-section>
                <q-item-label>Cancel</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-header>
    <q-footer bordered class="bg-white text-black">
      <q-tabs dense no-caps>
        <q-tab icon="house" label="Home" name="home" />
        <q-tab icon="o_slideshow" label="Shorts" name="shorts" />
        <q-tab icon="o_video_library" label="Library" name="library" />
      </q-tabs>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
