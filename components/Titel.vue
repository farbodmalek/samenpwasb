<template>
  <div class="col col-12 d-flex align-center pt-1">
    <hr class="v-divider theme--light"/>
    <strong class="mx-2 text-black text-center col-4 titel-font">{{ title }}
    </strong>
    <hr class="v-divider v-theme--light"/>
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  title: string;
}>();



</script>
