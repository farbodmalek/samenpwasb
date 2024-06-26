
<template>
  <div id="app">
    <Loading/>
    <LayoutHeader></LayoutHeader>
    <LayoutSidebar></LayoutSidebar>
    <div id="main" class="mb-0">
      <slot />
    </div>
  </div>

</template>
<script setup>
import LayoutHeader from "~/components/Layouts/LayoutHeader.vue";
import LayoutSidebar from "~/components/Sidebar/LayoutSidebar.vue";
import {ToastNotificationService} from "~/core/toast-notification-service";
import Loading from "~/components/loading/loading.vue";
const { $pwa } = useNuxtApp()
onMounted(() => {
  if ($pwa.offlineReady)
    ToastNotificationService.success('برنامه برای استفاده افلاین اماده است ')
})

</script>
