<script lang="ts" setup>
import { useStore } from "~/store";

let { toggleSidebar } = useStore();
const router = useRouter();
const route = useRoute();

const goBack =()=>{
  router.back()
}

</script>
<template>
  <header class="bg-blue-1" style="height: 50px">
    <div class="d-flex justify-content-between pt-1 px-2">
      <div class="px-1 py-2">
        <span class="px-1 font3 fw-bold text-white "> </span>
        <span class=" fw-bold text-white fs-6"></span>
      </div>
      <div class="d-flex">
        <span class="px-2 py-2 fw-bold text-white  mx-1 ">نقشه</span>

        <a
          href="#"
          class="burger-btn d-block d-xl-none text-white px-2 py-1 position-relative  "
          @click="goBack"
        >
          <img src="/img/icons8-arrow-50.png" class=" text-white fs-3" style="width: 33px;">


        </a>

      </div>
    </div>
  </header>
</template>
<style lang="scss">
.font3{
  font-size: 10px;
}

.title-header{
  width:47px ;
  background-color:#e5e5e5;
  height: 38px  ;
  top: 0;
  right: -8px;
  border-bottom-left-radius: 5px;
  border-top: 5px;
padding: 5px 0px 0px 5px  ;
font-size: 20px ;
}

</style>
