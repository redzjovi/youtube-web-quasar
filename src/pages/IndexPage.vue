<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>

<template>
  <q-page class="items-center justify-evenly row">
    <q-btn color="primary" label="Desktop version" :to="{ name: 'desktop' }" />
    <q-btn color="primary" label="Mobile version" :to="{ name: 'mobile' }" />
  </q-page>
</template>
