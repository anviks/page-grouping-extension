<template>
  <v-treeview
    :items="bookmarks"
    density="compact"
  >
    <template #prepend="{ item }">
      <v-btn
        @click.stop="() => $emit('selected', item)"
        color="blue"
        icon="mdi-arrow-up-box"
        variant="text"
        style="width: 25px; height: 25px"
      />
    </template>
  </v-treeview>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  bookmarks: {
    type: Array as PropType<chrome.bookmarks.BookmarkTreeNode[]>,
    required: true,
  },
});
</script>

<style scoped lang="scss"></style>
