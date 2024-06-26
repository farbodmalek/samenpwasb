<template>
  <div id="app">
    <LayoutHeaderMap></LayoutHeaderMap>
    <div id="main">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import LayoutHeaderMap from "~/components/Layouts/LayoutHeaderMap.vue";
import LayoutSidebar from "~/components/Sidebar/LayoutSidebar.vue";
</script>