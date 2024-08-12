<template>
  <div class=" error-page container">
    <div class="col-md-8 col-12 offset-md-2">
        <div class="text-center ">
            <img class="container" src="~/assets/images/error-404.png"  alt="Not Found">
            <h1 class="error-title">خطا در دسترسی </h1>
            <p class='fs-5 text-gray-600'>برای استفاده از سامانه با تلفن همراه  وارد شوید</p>
<!--            <nuxt-link to="/" class="btn btn-lg btn-outline-primary mt-3">خانه</nuxt-link>-->
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

definePageMeta({
  layout: 'error'
})
</script>
