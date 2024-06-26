<template>
  <div id="app" >
    <div id="main" class="mb-0 ">
      <Loading/>
      <slot/>
    </div>
  </div>
</template>
<script setup>
import Loading from "~/components/loading/loading.vue";
</script>
