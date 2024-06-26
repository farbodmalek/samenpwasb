

import {defineStore} from "pinia";

export const UseLoading = defineStore('loading', {
  state: () => (
    {
      isLoading: false,
    }
  ),
  actions: {
    getLoadingShow() {
      return this.isLoading = true;
    },

    getLoadingHide() {
      return this.isLoading = false;
    },

    showLoading() {
      return this.isLoading;
    }
  }
})
