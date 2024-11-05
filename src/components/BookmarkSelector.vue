<template>
  <v-dialog
    v-if="!viewStore.isPopupWindow"
    max-width="340"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        :color="color"
        v-bind="activatorProps"
        prepend-icon="mdi-bookmark-multiple-outline"
      >
        Add from bookmarks
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-package"
        title="Choose a bookmark folder"
      >
        <BookmarkTree
          @selected="
            (node) => {
              processBookmarks(node);
              isActive.value = false;
            }
          "
          :bookmarks="bookmarks"
        />

        <template v-slot:actions>
          <v-btn
            class="ml-auto"
            text="Close"
            @click="isActive.value = false"
          />
        </template>
      </v-card>
    </template>
  </v-dialog>
  <template v-else>
    <v-btn
      :color="color"
      @click="panelState = panelState === 0 ? undefined : 0"
      prepend-icon="mdi-bookmark-multiple-outline"
    >
      Add from bookmarks
    </v-btn>
    <v-expansion-panels
      v-model="panelState"
      class="mt-2"
    >
      <v-expansion-panel>
        <v-expansion-panel-text>
          <BookmarkTree
            @selected="processBookmarks"
            :bookmarks="bookmarks"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useViewStore } from '@/stores/viewStore';
import BookmarkTree from '@/components/BookmarkTree.vue';

defineProps({
  color: {
    type: String,
    default: 'white',
  },
});

const emit = defineEmits(['selected']);

const viewStore = useViewStore();

let bookmarks: chrome.bookmarks.BookmarkTreeNode[];
onMounted(async () => {
  bookmarks = (await chrome.bookmarks.getTree())[0].children ?? [];
});

const panelState = ref();
const processBookmarks = (bookmarkNode: chrome.bookmarks.BookmarkTreeNode) => {
  panelState.value = undefined;

  const getUrls = (node: chrome.bookmarks.BookmarkTreeNode) => {
    const urls: string[] = [];

    if (node.children) {
      for (const child of node.children) {
        urls.push(...getUrls(child)!);
      }
    } else {
      urls.push(node.url!);
    }

    return urls;
  };

  emit('selected', {
    title: bookmarkNode.title,
    urls: getUrls(bookmarkNode),
  });
};
</script>

<style scoped lang="scss"></style>
