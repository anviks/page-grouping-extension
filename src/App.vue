<template>
  <v-btn
    v-if="viewStore.isPopupWindow"
    @click="openExtensionInBrowser"
    size="small"
    class="mb-6 text-none"
    prepend-icon="mdi-open-in-new"
  >
    Open In Browser
  </v-btn>
  <router-view />
</template>

<script setup lang="ts">
import { useViewStore } from '@/stores/viewStore';

const viewStore = useViewStore();

const openExtensionInBrowser = () => {
  window.open(location.href);
};
</script>

<style scoped lang="scss">
.page-groups {
  display: grid;
  gap: 1rem;
  grid-template-columns: max-content max-content max-content;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
  max-width: 800px;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
