<template>
  <div v-if="showInstructions" class="instructions">
    <h2>نصب برنامه PWA</h2>
    <div v-if="isAndroid">
      <h3>Android</h3>
      <p>برای نصب برنامه، مراحل زیر را دنبال کنید:</p>
      <ol>
        <li>باز کردن مرورگر Chrome</li>
        <li>کلیک روی منوی مرورگر (سه نقطه در گوشه بالا سمت راست)</li>
        <li>انتخاب گزینه "افزودن به صفحه اصلی"</li>
      </ol>
    </div>
    <div v-if="isIOS">
      <h3>iOS</h3>
      <p>برای نصب برنامه، مراحل زیر را دنبال کنید:</p>
      <ol>
        <li>باز کردن Safari</li>
        <li>کلیک روی دکمه Share (آیکون مربع با فلش بالا)</li>
        <li>انتخاب گزینه "افزودن به صفحه اصلی"</li>
        <li>تایید نام و کلیک روی افزودن</li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const isAndroid = ref(false);
const isIOS = ref(false);
const showInstructions = ref(true);

onMounted(() => {
  const userAgent = window.navigator.userAgent;
  isAndroid.value = /android/i.test(userAgent);
  isIOS.value = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

  // Check if the instructions have already been shown
  if (localStorage.getItem('instructionsShown') === 'true') {
    showInstructions.value = false;
  } else {
    // Mark the instructions as shown
    localStorage.setItem('instructionsShown', 'true');
  }
});
</script>

<style lang="scss">
.instructions {
  text-align: right;
  direction: rtl;
  margin: 20px;

  h2, h3 {
    color: #333;
  }

  ol {
    margin-top: 10px;
    padding-left: 20px;
    list-style-type: decimal;

    li {
      margin-bottom: 10px;
    }
  }
}
</style>
