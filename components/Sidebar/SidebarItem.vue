<template>
  <li class="sidebar-item" ref="sidebarItem">
      <nuxt-link class="sidebar-link justify-content-between" :to="item.url">
        <img :src="`${item.img}`" width="20" />
        <span class="">{{ item.name }}</span>
      </nuxt-link>
  </li>
</template>
<script lang="ts" setup>
const router = useRouter();
const props = defineProps<{
  item: string;
}>();

const sidebarItem = ref<HTMLElement>();

</script>

<style>

</style>
