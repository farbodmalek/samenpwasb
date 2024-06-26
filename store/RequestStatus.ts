// authStore.ts
import { defineStore } from 'pinia';

export const RequestStatus = defineStore('RequestStatus', {
  state: () => ({
    isHaserequest: false,
    status: false,
  }),

  actions:{

    SendPhotoShow() {
      return this.status = true;
    },

    SendPhotoHide() {
      return this.status = false;
    },



  }

});
