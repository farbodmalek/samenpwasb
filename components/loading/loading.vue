<template>
  <div class="overlay" v-if="loading">
    <div class="spinner-container">
      <div class="spinner-border " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UseLoading} from "../../store/loading-store";

const isLoading = UseLoading();
const loading = computed(() => isLoading.isLoading);



</script>

<style scoped lang="scss">

.loading-parent {
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1008;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .2);
}

.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.spinner-container {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000004d;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */
}

</style>
