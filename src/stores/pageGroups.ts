import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { PageGroup } from '@/types';

export const usePageGroupStore = defineStore('pageGroups', () => {
  const groups = ref<PageGroup[]>([]);

  const loadGroups = async () => {
    const result = await chrome.storage.local.get('groups');
    groups.value = JSON.parse(result.groups || '[]');
  };

  const saveGroups = async () => {
    await chrome.storage.local.set({ groups: JSON.stringify(groups.value) });
  };

  return { groups, loadGroups, saveGroups };
});
