\<template>
  <div class="z1-3">
    <p class="text-center"> کاربر گرامی شما دارای نظارت افلاین هستید.نظارت های افلاین شما تا ساعت 12شب ذخیره میماند.
      در صورت دسترسی به اینترنت در در اسرع وقت  به سمت سرور ارسال کنید </p>
    <div class="col-12 d-flex justify-content-center">
      <div class="col-12 d-flex justify-content-center gap-2">

        <button class="bg-success rounded-5 rounded-pill p-3 col-5 text-white bg-blue-1 py-1 address-font" type="button"
                @click="reject()">
          بستن
        </button>
        <button class="bg-danger rounded-5 rounded-pill p-3 col-5 text-white bg-blue-1 py-1 address-font" type="button"
                @click="logOut">
          خروج از برنامه
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {useFormStore} from "~/store/Form";

const dialogRef = inject('dialogRef');
const router = useRouter();
const store = useFormStore()

const logOut = () => {
  router.push("authorization/login");
  localStorage.removeItem("User-data");
  localStorage.removeItem("localStorageUserKey");
  localStorage.removeItem("nuxt-color-mode");
  localStorage.removeItem("data");
}

const reject = (data: boolean = false) => {
  dialogRef.value.close(data);
}

</script>

<style lang="scss">
</style>
