<template>
  <RotateSquareLoading v-if="isLoading" />
  <template v-else>
    <div class="page-groups">
      <PageGroupComponent
        v-for="(group, i) in store.groups"
        :key="group.name"
        :group="group"
        @delete="() => deleteGroup(i)"
        @edit="() => editGroup(i)"
      />
      <v-fab
        @click="addGroup"
        key="mdi-plus"
        color="green"
        icon="mdi-plus"
        location="bottom center"
        size="40"
        class="mt-16 justify-center"
        appear
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import PageGroupComponent from '@/components/PageGroupComponent.vue';
import { onMounted, ref } from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import { usePageGroupStore } from '@/stores/pageGroups';
import { useRouter } from 'vue-router';
import RotateSquareLoading from '@/components/animations/RotateSquareLoading.vue';

const store = usePageGroupStore();
const router = useRouter();

const isLoading = ref(true);

onMounted(async () => {
  window.resizeTo(800, 600);
  await store.loadGroups();
  isLoading.value = false;
});

const addGroup = () => {
  router.push({ name: 'AddGroup' });
};

const editGroup = (index: number) => {
  router.push({ name: 'EditGroup', params: { id: index } });
};

const deleteGroup = (index: number) => {
  store.groups.splice(index, 1);
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
