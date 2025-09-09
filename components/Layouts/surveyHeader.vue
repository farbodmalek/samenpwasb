<template>
  <header class="bg-blue-1" style="height: 50px">
    <div class="d-flex justify-content-between pt-1 px-2">
      <div class="px-1 py-2">
          <span class="px-1 font3 fw-bold text-white">
            {{ surveyData.customerNumber }}</span>
        <span class="fw-bold text-white font-text">:شماره مشتری </span>
      </div>
      <div class="d-flex">
          <span class="px-2 py-2 fw-bold text-white font-header">
            {{ surveyData.customerName }}</span>
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
  </header>
</template>

<script lang="ts" setup>
import {useFormStore} from "~/store/Form";
import Confirm from "../ConfirmExiteSurvey.vue";
import {useDialog} from "primevue/usedialog";
import { useSurveyStore } from "~/store/useSurveyStore";


const router = useRouter();
const route = useRoute();
const surveyStore = useSurveyStore();
const surveyData = surveyStore.getCartableUserDataById(Number(route.query.loanId));
const loanSurveyEconomidTypeId = parseInt(router.currentRoute._value.query.loanType)
const store = useFormStore()
const dialog = useDialog();
const emit = defineEmits(['saveform2','saveform3',])

const goBack = () => {
  if (route.path === "/survey/Stepone") {
    showProducts()
  }
  else if (route.path === "/survey/StepTwo") {
    emit('saveform2',true);
    router.push({ path: "/survey/Stepone", query: {id:surveyData.id ,loanType:loanSurveyEconomidTypeId }});
  }
  else if (route.path === "/survey/StepThree") {
    emit('saveform3',true);
    router.push({ path: "/survey/StepTwo", query: {id:surveyData.id ,loanType:loanSurveyEconomidTypeId }});
  }
  else if(route.path === "/navigation/EditAddress"){
    router.push({ path: "/survey/Stepone", query: {id:surveyData.id ,loanType:loanSurveyEconomidTypeId }});
  }
};




const showProducts = () => {
  dialog.open(Confirm, {
    props: {
      header: '',
      modal: true,
      style: {
        width: '40%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    onClose: () => {
    },
  });
}

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
