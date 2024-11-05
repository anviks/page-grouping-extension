import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useViewStore = defineStore('view', () => {
  const isPopupWindow = computed(() => {
    return chrome.extension.getViews({ type: 'popup' })[0] === window;
  });

  return { isPopupWindow };
});
