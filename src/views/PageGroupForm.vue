<template>
  <RotateSquareLoading v-if="isLoading" />
  <v-form
    v-else
    fast-fail
    ref="form"
  >
    <div class="mb-4">
      <v-text-field
        v-model="pageGroup.name"
        :rules="rules.groupName"
        label="Group name"
        required
      />
    </div>
    <div
      v-for="(url, i) in pageGroup.urls"
      :key="i"
      class="mb-3 d-flex gc-4"
    >
      <v-checkbox-btn
        v-model="pageGroup.urls[i].enabled"
        class="flex-0-0"
      />
      <v-text-field
        v-model="pageGroup.urls[i].url"
        :rules="rules.url"
        :label="'Url ' + (i + 1)"
        required
        :disabled="!pageGroup.urls[i].enabled"
        :style="{ 'text-decoration': pageGroup.urls[i].enabled ? 'none' : 'line-through' }"
      />
      <v-btn
        @click="() => pageGroup.urls.splice(i, 1)"
        :size="buttonSize"
        class="my-2 bg-red text-white"
        icon="mdi-close-thick"
      />
    </div>
    <div class="url-buttons">
      <v-btn
        @click="
          () => {
            pageGroup.urls.push({ enabled: true, url: '' });
          }
        "
        color="green"
      >
        Add url
      </v-btn>
      <BookmarkSelector
        @selected="addBookmarkUrls"
        color="light-green-darken-1"
      />
    </div>
    <div class="form-control-buttons">
      <v-btn
        @click.prevent="saveGroup"
        type="submit"
        color="blue"
      >
        Submit
      </v-btn>
      <v-btn
        @click="returnHome"
        color="red"
      >
        Cancel
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { computed, onMounted, type Ref, ref } from 'vue';
import type { Bookmark, PageGroup } from '@/types';
import { usePageGroupStore } from '@/stores/pageGroups';
import { useDisplay } from 'vuetify';
import { useRoute, useRouter } from 'vue-router';
import RotateSquareLoading from '@/components/animations/RotateSquareLoading.vue';
import BookmarkSelector from '@/components/BookmarkSelector.vue';

const route = useRoute();
const router = useRouter();
const { name } = useDisplay();
const store = usePageGroupStore();

const index: number = parseInt(<string>route.params.id);

const isLoading = ref(true);
const form = ref();
let pageGroup: Ref<PageGroup>;

onMounted(async () => {
  await store.loadGroups();

  if (isNaN(index)) {
    pageGroup = ref({ name: '', urls: [] });
  } else {
    pageGroup = ref(store.groups[index]);
  }

  isLoading.value = false;
});

const buttonSize = computed(() => {
  switch (name.value) {
    case 'xs':
    case 'sm':
      return 'small';
  }
  return 'default';
});

const returnHome = async () => {
  await router.push({ name: 'Home' });
};

const saveGroup = async () => {
  const validationResult = await form.value?.validate();
  if (validationResult.valid) {
    if (isNaN(index)) {
      store.groups.push(pageGroup.value);
    }
    await store.saveGroups();
    await returnHome();
  }
};

const addBookmarkUrls = (bookmark: Bookmark) => {
  if (!pageGroup.value.name) {
    pageGroup.value.name = bookmark.title;
  }

  pageGroup.value.urls.push(...bookmark.urls.map((url) => ({ url, enabled: true })));
};

const rules = {
  groupName: [
    (value: string) => {
      if (value) return true;
      return 'Name is required.';
    },
    (value: string) => {
      if (value.length < 64) return true;
      return 'Name must be less than 64 characters.';
    },
  ],
  url: [
    (value: string) => {
      if (value) return true;
      return 'Url cannot be empty.';
    },
    (value: string) => {
      const urlPattern = /^(http|https|ftp|ftps|file):\/\/.+$/;
      if (urlPattern.test(value)) return true;
      return 'Invalid URL.';
    },
  ],
};
</script>

<style scoped lang="scss">
.v-btn {
  margin-right: 10px;
}

.form-control-buttons {
  margin-top: 50px;
}
</style>
