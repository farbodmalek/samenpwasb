<template>
  <div v-if="showInstructions" class="instructions">
    <div class="text-center" v-if="isIOS">
      <p >برای نصب برنامه، مراحل زیر را دنبال کنید:</p>
      <ol>
        <li>کلیک روی منوی مرورگر   <img src="/img/download.png" width="20" class="mx-2"></li>
        <li>انتخاب گزینه "Add to Home Screen"</li>
        <li>تایید نام و کلیک روی "add"</li>
        <li>برنامه به صفحه اصلی اضافه شد </li>
      </ol>
    </div>

    <div class="text-center" v-if="isAndroid">
      <p>برای نصب برنامه، مراحل زیر را دنبال کنید:</p>
      <ol>
        <li>کلیک روی منوی مرورگر (سه نقطه در گوشه بالا سمت راست یا بالا سمت چپ )</li>
        <li>انتخاب گزینه "افزودن به صفحه اصلی"</li>
        <li>برنامه به صفحه اصلی اضافه شد </li>
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


  if (localStorage.getItem('instructionsShown') === 'true') {
    showInstructions.value = false;
  } else {
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
