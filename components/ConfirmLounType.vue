<template>
  <div class="d-flex flex-column p-2 justify-content-center align-items-center  ">
    <div class="col-12 text-center border border-secondary p-3" @click="routerTypeHandel(1,)">
      <span>دامپروری</span>
    </div>
    <div class="col-12 text-center border border-secondary p-3" @click="routerTypeHandel(2)">
      <span>زراعی/باغی</span>
    </div>
    <div class="col-12 text-center border border-secondary p-3" @click="routerTypeHandel(3)">
      <span>خدمات</span>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {useFormStore} from "~/store/Form";

const dialogRef = inject('dialogRef');
const router = useRouter();
const store = useFormStore()
const params = ref();

const routerTypeHandel = (loanType: number) => {
    router.push({path: "/survey/Stepone", query: {id: params.value, loanType}});
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
