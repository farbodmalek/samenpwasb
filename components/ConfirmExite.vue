<template>
  <div class="d-flex align-items-center gap-3 mb-2 mt-4">
    <p class="text-center ">
      برای این پرونده ارجاع شده نظارتی انجام نشده است .پرداخت دستمزد منوط به
      اتمام مراحل است ایا باز مایل به خروج هستید؟
    </p>
  </div>
  <div class="d-flex justify-content-end gap-2">
    <Button type="button"   class=" rounded-5 rounded-pill col-6 bg-danger text-white py-3" label="خیر" severity="secondary" @click="reject()"></Button>
    <Button type="button"   class=" rounded-5 rounded-pill  col-6 text-white bg-success py-3" label="بله" @click="ConfirmHandle"></Button>
  </div>
</template>


<script lang="ts" setup>
import {useFormStore} from "~/store/Form";

const dialogRef = inject('dialogRef');
const router = useRouter();
const store = useFormStore()

const ConfirmHandle = () => {
  localStorage.removeItem("firPreForm");
  localStorage.removeItem("SecPreForm");
  localStorage.removeItem("FinalRegistrationform");
  store.addressForm={}
  router.push("/");
};

const reject = (data: boolean = false) => {
  dialogRef.value.close(data);
}

</script>

<style lang="scss">

</style>
