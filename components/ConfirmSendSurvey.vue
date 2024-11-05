<template>
  <div class="d-flex flex-column p-2 justify-content-center align-items-center  ">
    <p class="text-center pt-3">نظارت شما با موفقیت ثبت شد </p>
    <nuxt-link class="col-12" to="/">
      <button class="text-white bg-blue-1 rounded-5 font1 col-12 text-white bg-success py-3 " type="button"
              @click="closeDialog">
        تایید
      </button>
    </nuxt-link>
  </div>
</template>


<script lang="ts" setup>
import {useFormStore} from "~/store/Form";

const dialogRef = inject('dialogRef');
const router = useRouter();
const store = useFormStore()
const params = ref();

const closeDialog = () => {
  location.reload()
}

const reject = (data: boolean = false) => {
  dialogRef.value.close(data);
}


onMounted(() => {
  params.value = dialogRef.value.data;
});
</script>

<style lang="scss">

</style>
