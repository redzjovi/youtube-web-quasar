<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'MobileMainLayout',
  setup() {
    const $route = useRoute();
    const $router = useRouter();

    const search = ref('');
    const searchDialog = ref(false);
    const accountDialog = ref(false);

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
      accountDialog,
      searchSubmit,
    };
  },
});
</script>

<template>
  <q-layout view="lHh lpr lFf">
    <q-header bordered class="bg-white text-black" reveal>
      <q-toolbar>
        <q-btn flat label="YouTube" :to="{ name: 'mobile' }" />
        <q-space />
        <q-btn flat icon="search" round @click="searchDialog = true" />
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
        <q-btn
          flat
          icon="o_account_circle"
          round
          @click="accountDialog = true"
        />
        <q-dialog maximized v-model="accountDialog">
          <q-card>
            <q-item>
              <q-item-section avatar>
                <q-icon name="o_close" @click="accountDialog = false" />
              </q-item-section>
              <q-item-section>Account</q-item-section>
            </q-item>
            <q-separator />
            <q-separator />
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_switch_account" />
              </q-item-section>
              <q-item-section>Sign In</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_settings" />
              </q-item-section>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_help_outline" />
              </q-item-section>
              <q-item-section>Help</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_feedback" />
              </q-item-section>
              <q-item-section>Feedback</q-item-section>
            </q-item>
            <q-separator />
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
