<template>
  <header class="bg-blue-1" style="height: 50px">
    <div class="d-flex justify-content-between pt-1 px-2">
      <div class="px-1 py-2">
          <span class="px-1 font3 fw-bold text-white">
            {{ InfoMonitored.loanDetail.customerNumber }}</span>
        <span class="fw-bold text-white font-text">:شماره مشتری </span>
      </div>
      <div class="d-flex">
          <span class="px-2 py-2 fw-bold text-white font-header">
            {{ InfoMonitored.loanDetail.customerName }}</span>
        <p class="burger-btn d-block d-xl-none text-white position-relative mx-4"
          @click="goBack">
          <img
          class="position-absolute top-0 bottom-0"
          src="../../assets\images\back.png  "
          style="width: 50px; height: 50px; left: -18px"
        />
        </p>
      </div>
    </div>
    <Dialog v-model:visible="visible"  modal :showHeader="false">
      <div class="d-flex align-items-center gap-3 mb-2 mt-4">
        <p class="text-center ">
          برای این پرونده ارجاع شده نظارتی انجام نشده است .پرداخت دستمزد منوط به
          اتمام مراحل است ایا باز مایل به خروج هستید؟
        </p>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <Button type="button"   class=" rounded-5 rounded-pill col-6 bg-danger text-white py-3" label="خیر" severity="secondary" @click="visible = false"></Button>
        <Button type="button"   class=" rounded-5 rounded-pill  col-6 text-white bg-success py-3" label="بله" @click="homeHandle"></Button>
      </div>
    </Dialog>
  </header>
</template>

<script lang="ts" setup>
import {Useform} from "~/store/Form";

const router = useRouter();
const route = useRoute();
const visible = ref(false);
const GetCartable = JSON.parse(<any>localStorage.getItem('GetCartables'));
const LounId = router.currentRoute._value.query.id;
const loanSurveyEconomidTypeId = parseInt(router.currentRoute._value.query.loanType)
const InfoMonitored = GetCartable.find((item: any) => item.id === Number(LounId));
const store = Useform()

const goBack = () => {
  if (route.path === "/survey/Stepone") {
    visible.value = true
  } else if (route.path === "/survey/StepTow") {
    router.push({ path: "/survey/Stepone", query: {id:InfoMonitored.id ,loanType:loanSurveyEconomidTypeId }});

  } else if (route.path === "/survey/StepThree") {

    router.push({ path: "/survey/StepTow", query: {id:InfoMonitored.id ,loanType:loanSurveyEconomidTypeId }});
  }
  else if(route.path === "/navigtion/EditAddress"){
    router.push({ path: "/survey/Stepone", query: {id:InfoMonitored.id ,loanType:loanSurveyEconomidTypeId }});
  }
};

const homeHandle = () => {
  localStorage.removeItem("firPreForm");
  localStorage.removeItem("SecPreForm");
  localStorage.removeItem("FinalRegistrationform");
  store.addressform={}
  router.push("/");
};


</script>

<style lang="scss">
.font3 {
  font-size: 10px;
}

.title-header {
  width: 47px;
  background-color: #e5e5e5;
  height: 38px;
  top: 0;
  right: -8px;
  border-bottom-left-radius: 5px;
  border-top: 5px;
  padding: 5px 0px 0px 5px;
  font-size: 20px;
}

</style>
