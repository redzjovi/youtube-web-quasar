<script lang="ts">
import { defineComponent, ref } from 'vue';
import LeftDrawerList from 'layouts/desktop/_LeftDrawerList.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DesktopMainLayout',
  components: {
    LeftDrawerList,
  },
  setup() {
    const $router = useRouter();

    const leftDrawer = ref(false);
    const searchPrependIcon = ref(false);
    const search = ref('');

    const searchSubmit = () => {
      if (!search.value) {
        return;
      }
      $router.push({
        name: 'desktop-results',
        query: { search_query: search.value },
      });
    };

    return {
      leftDrawer,
      searchPrependIcon,
      search,
      searchSubmit,
    };
  },
});
</script>

<template>
  <q-layout view="lHh lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat icon="menu" round @click="leftDrawer = !leftDrawer" />
        <q-btn flat label="YouTube" :to="{ name: 'desktop' }" />
        <q-space />
        <div class="col-md-4 col-sm-6">
          <q-form class="row" @submit="searchSubmit">
            <q-input
              class="col"
              clear-icon="close"
              clearable
              dense
              outlined
              placeholder="Search"
              square
              v-model="search"
              @blur="searchPrependIcon = false"
              @focus="searchPrependIcon = true"
            >
              <template v-slot:before>
                <q-icon
                  class="invisible"
                  name="search"
                  v-if="!searchPrependIcon"
                />
              </template>
              <template v-slot:prepend>
                <q-icon name="search" v-if="searchPrependIcon" />
              </template>
            </q-input>
            <q-btn
              class="header-toolbar-search-button q-mr-sm"
              color="grey-3"
              icon="search"
              text-color="grey-8"
              type="submit"
              unelevated
            >
              <q-tooltip anchor="bottom middle" self="top middle">
                Search
              </q-tooltip>
            </q-btn>
            <q-btn flat icon="mic" round>
              <q-tooltip anchor="bottom middle" self="top middle">
                Search with your voice
              </q-tooltip>
            </q-btn>
          </q-form>
        </div>
        <q-space />
        <q-btn flat icon="apps" round>
          <q-tooltip anchor="bottom middle" self="top middle">
            YouTube apps
          </q-tooltip>
        </q-btn>
        <q-btn flat icon="more_vert" round>
          <q-tooltip anchor="bottom middle" self="top middle">
            Settings
          </q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          icon="o_account_circle"
          label="SIGN IN"
          outline
        />
      </q-toolbar>
    </q-header>
    <q-drawer behavior="mobile" overlay side="left" v-model="leftDrawer">
      <q-scroll-area class="fit">
        <LeftDrawerList />
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.header-toolbar-search-button {
  border-color: #0000003d;
  border-radius: 0;
  border-style: solid;
  border-width: 1px 1px 1px 0;
  height: 40px;
}
</style>
