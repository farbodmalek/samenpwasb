<template>
  <div id="app">
    <Loading/>
    <div id="main" class="mb-0 container bg-gray-1">
      <slot />
    </div>
  </div>

</template>
<script setup>

import {ToastNotificationService} from "~/core/toast-notification-service";
import Loading from "~/components/loading/loading.vue";
const { $pwa } = useNuxtApp()
onMounted(() => {
  if ($pwa.offlineReady)
    ToastNotificationService.success('برنامه برای استفاده افلاین اماده است ')
})

</script>
