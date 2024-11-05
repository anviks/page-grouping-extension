<template>
  <v-btn
    class="large"
    @click="openGroup"
    >{{ group.name }}
  </v-btn>
  <IconPencil
    class="edit-button"
    @click="$emit('edit')"
  />
  <IconTrash
    class="delete-button"
    @click="$emit('delete')"
  />
</template>

<script setup lang="ts">
import type { PageGroup } from '@/types';
import type { PropType } from 'vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconPencil from '@/components/icons/IconPencil.vue';

const props = defineProps({
  group: {
    type: Object as PropType<PageGroup>,
    required: true,
  },
});

const openGroup = () => {
  props.group.urls.forEach((url) => {
    if (url.enabled) window.open(url.url);
  });
};
</script>

<style scoped>
.delete-button,
.edit-button {
  cursor: pointer;
}
</style>
