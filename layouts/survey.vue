<template>
  <div id="app">
    <Loading/>
    <div id="main" class="mb-0 container bg-gray-1">
<!--      <surveyHeader></surveyHeader>-->
      <slot />
    </div>
  </div>

</template>
<script setup>
import surveyHeader from "~/components/Layouts/surveyHeader.vue";

import {ToastNotificationService} from "~/core/toast-notification-service";
import Loading from "~/components/loading/loading.vue";
const { $pwa } = useNuxtApp()
onMounted(() => {
  if ($pwa.offlineReady)
    ToastNotificationService.success('برنامه برای استفاده افلاین اماده است ')
})

</script>
