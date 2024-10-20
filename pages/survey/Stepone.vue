<template>
  <SurveyHeader/>
  <CardDetails />
  <form  @submit.prevent="submitForm()">
    <section class="col col-12 d-flex align-center pt-1 flex-column mb-2 text-black ">
      <div class="col-12 form-group px-4 d-flex justify-content-between">
        <SelectButton v-model="form.genderType"
                      :class="{'p-invalid': v$.genderType.$invalid && submitted}"
                      :options="exportedObjects.genderoptions"
                      aria-labelledby="basic"
                      class="col-8 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"/>
        <label>جنسیت</label>
      </div>
      <div class="col-12 form-group px-4 d-flex justify-content-between">
        <SelectButton v-model="form.residentTypeId"
                      :class="{'p-invalid': v$.residentTypeId.$invalid && submitted}"
                      :options="exportedObjects.options"
                      aria-labelledby="basic"
                      class="col-8 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"/>
        <label>محل اجرا</label>
      </div>
      <div class="col-12 form-group px-4 d-flex justify-content-between">
        <SelectButton v-model="form.maritalStatusId"
                      :class="{'p-invalid': v$.maritalStatusId.$invalid && submitted}"
                      :options="exportedObjects.optionmaritalStatus"
                      aria-labelledby="basic"
                      class="col-8 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"/>
        <label>وضعیت</label>
      </div>
      <div class="col-12 form-group px-4 d-flex justify-content-between">
        <SelectButton v-model="form.isFamilySupervisor"
                      :class="{'p-invalid': v$.isFamilySupervisor.$invalid && submitted}"
                      :options="exportedObjects.optionFamilySupervisor"
                      aria-labelledby="basic"
                      class="col-8 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"/>
        <label>سرپرست</label>
      </div>
    </section>
    <section class="col col-12 d-flex align-center pt-1 flex-column mb-2">
      <Titel :title="'تحصیلات'"/>
      <div class="d-flex form-group">
        <SelectButton
                      v-model="form.educationTypeId"
                      :class="{'p-invalid': v$.educationTypeId.$invalid && submitted,}"
                      :options="exportedObjects.educationTypes"
                      aria-labelledby="basic"
                      class=" d-flex border-secondary gap-2 flex-direction-row  justify-content-center flex-wrap group-titel"
                      optionLabel="value"
                      optionValue="key"/>
      </div>
    </section>
    <section class="col-12 d-flex align-center pt-1 flex-column mb-2">
      <Titel :title="'اطلاعات تماس'"/>
      <div class="form-group mb-1 px-1 col-12 d-flex flex-column">
        <input-text
          v-model="form.mobileNo"
          :class="{'p-invalid': v$.mobileNo.$invalid && submitted}"
          class="w-100 text-center "
          inputmode="numeric"
          placeholder="تلفن همراه  "
          style="height: 50px"
          type="text"
          @input="form.mobileNo = convertPersianNumbersToEnglish(form.mobileNo)"
        />
        <input-text
          v-model="form.Phone"
          :class="{'p-invalid': v$.phone.$invalid && submitted}"
          class="w-100 text-center mt-2"
          inputmode="numeric"
          placeholder="تلفن ثابت"
          style="height: 50px"
          type="text"
          @input="form.Phone = convertPersianNumbersToEnglish(form.Phone)"
        />
      </div>
      <div
        class="d-flex justify-content-between mt-4 pt-1 px-3 col-12 text-center">
        <div class="col-3">
          <button
            class="btn bg-secondary rounded-4  address-font py-3 text-white"
            type="button"
            @click="navigateToEditAddress()">
            <p v-if=" surveyData.loanPlan && surveyData.loanPlan.id === 0" class="my-1">ثبت آدرس </p>
            <p v-else class="my-1">تغییر آدرس </p>
          </button>

        </div>
        <p>آدرس :
          <span class="py-2 col-2">{{ form.address }}
        </span>
        </p>
      </div>
      <p v-if="error && form.address.trim() ==='' " class="error text-center pt-4">
        لطفا ادرس را انتخاب کنید
      </p>
    </section>

    <section class="col-12 d-flex align-center pt-1 flex-column mb-2">
      <Titel :title="'اطلاعات وام'"/>
      <p class="text-start px-2 mb-1"> نوع وام </p>
      <div>
        <div class="d-flex form-group ">
          <SelectButton
            v-model="form.planTypeId"
            :class="{'p-invalid': v$.planTypeId.$invalid && submitted}"
            :options="exportedObjects.planTypes"
            aria-labelledby="basic"
            class=" d-flex border-secondary gap-2 flex-direction-row  justify-content-center flex-wrap group-titel lounplan-titel"
            optionLabel="value"
            optionValue="key"
       />
        </div>
      </div>

    </section>
    <div class="px-1 col col-12  align-center pt-1 px-2  justify-content-between">
      <div class="px-2 d-flex flex-reverse flex-row-reverse ">
        <strong class="mx-1 fw-bold">:دسته وام </strong>
        <p class=""  v-if="surveyData.loanPlan"> {{ surveyData.loanPlan.planNo.name }}</p>
      </div>
      <div class="col-12">
      </div>
    </div>

    <div class="d-grid col-11 mx-auto pt-3 mb-5">
      <button
        class="text-white bg-blue-1 rounded-pill p-3 ">
        ثبت اطلاعات اولیه
      </button>
    </div>
  </form>

</template>

<!--<script lang="ts" setup>-->
<!--import Carddetails from "~/components/PaymentDetails.vue";-->
<!--import {ToastNotificationService} from "~/core/toast-notification-service";-->
<!--import {required} from '@vuelidate/validators';-->
<!--import {useVuelidate} from "@vuelidate/core";-->
<!--import { Useform } from "~/store/Form";-->
<!--import { useSurveyStore } from "~/store/useSurveyStore";-->
<!--import exportedObjects from '~/core/Enum/baseEnum';-->
<!--import surveyHeader from "~/components/Layouts/surveyHeader.vue";-->

<!--definePageMeta({-->
<!--  layout: "survey",-->
<!--});-->


<!--const store=Useform()-->
<!--const router = useRouter();-->
<!--const route = useRoute();-->
<!--const error = ref(false);-->
<!--const submitted = ref(false);-->
<!--const Mainstore = useSurveyStore();-->
<!--const loanSurveyEconomidTypeId = route.query.loanType-->
<!--const InfoMonitored = Mainstore.getCartableUserDataById(Number(route.query.id));-->
<!--const Supervisory = JSON.parse(<any>localStorage.getItem('User-data'));-->
<!--let previousValues = <any>{};-->
<!--const form = <any>reactive({-->
<!--  genderType:   InfoMonitored.customerGenderType,-->
<!--  residentTypeId:  InfoMonitored.loanPlan.residentTypeId == "" ? null : InfoMonitored.loanPlan.residentTypeId,-->
<!--  maritalStatusId:  InfoMonitored.loanPlan.maritalStatusId ?InfoMonitored.loanPlan.maritalStatusId : InfoMonitored.loanPlan.maritalStatusId,-->
<!--  isFamilySupervisor:  InfoMonitored.loanPlan.isFamilySupervisor == "" ? null : InfoMonitored.loanPlan.isFamilySupervisor,-->
<!--  Phone:  InfoMonitored.loanPlan.phone,-->
<!--  mobileNo:  InfoMonitored.mobileNo.slice(-11) == "" ? null : InfoMonitored.mobileNo.slice(-11),-->
<!--  planTypeId:  InfoMonitored.loanPlan.planTypeId == "" ? null : InfoMonitored.loanPlan.planTypeId,-->
<!--  educationTypeId: InfoMonitored.loanPlan.educationTypeId == "" ? null : InfoMonitored.loanPlan.educationTypeId,-->
<!--  planNoId: InfoMonitored.loanPlan.planNoId,-->
<!--  id:  InfoMonitored.loanPlan.id,-->
<!--  cartableId:  InfoMonitored.loanPlan.cartableId,-->
<!--  loanId:  InfoMonitored.loanPlan.loanId,-->
<!--  loanSurveyEconomidTypeId: loanSurveyEconomidTypeId,-->
<!--  otherPlanNo: InfoMonitored.loanPlan.otherPlanNo,-->
<!--  latitude: store.addressform.latitude ? store.addressform.latitude :InfoMonitored.loanPlan.latitude,-->
<!--  longitude:  store.addressform.longitude ? store.addressform.longitude :InfoMonitored.loanPlan.longitude,-->
<!--  address: store.addressform.address ? store.addressform.address : InfoMonitored.loanPlan.address,-->
<!--  villageName:store.addressform.villageName ? store.addressform.villageName : InfoMonitored.loanPlan.villageName,-->
<!--  UserOtherPlanNo: Supervisory.id,-->
<!--  insuranceTypeId:  InfoMonitored.loanPlan.insuranceTypeId,-->
<!--  workShopCode:  InfoMonitored.loanPlan.workShopCode,-->
<!--  isValidPlanNo:  false,-->
<!--  UserPlanNoText: null,-->
<!--  planNoDto: null,-->
<!--});-->

<!--const rules = computed(() => {-->
<!--  return {-->
<!--    Phone: {required},-->
<!--    mobileNo: {required},-->
<!--    planTypeId: {required},-->
<!--    isValidPlanNo: {required},-->
<!--    educationTypeId: {required},-->
<!--    genderType: {required},-->
<!--    residentTypeId: {required},-->
<!--    maritalStatusId: {required},-->
<!--    isFamilySupervisor: {required},-->
<!--  };-->
<!--});-->

<!--const v$ = useVuelidate(rules, form);-->

<!--const convertPersianNumbersToEnglish = (input:number) => {-->
<!--  const persianToEnglishMap = {-->
<!--    '۰': '0',-->
<!--    '۱': '1',-->
<!--    '۲': '2',-->
<!--    '۳': '3',-->
<!--    '۴': '4',-->
<!--    '۵': '5',-->
<!--    '۶': '6',-->
<!--    '۷': '7',-->
<!--    '۸': '8',-->
<!--    '۹': '9'-->
<!--  };-->
<!--  return input.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);-->
<!--};-->


<!--const MapRouteHandle = () => {-->
<!--  localStorage.setItem("firPreForm", JSON.stringify(form))-->
<!--  router.push({ path: "/navigtion/EditAddress", query: {id:InfoMonitored.id ,loanType:loanSurveyEconomidTypeId }});-->
<!--};-->

<!--const Pachvalue = () => {-->
<!--  previousValues=JSON.parse(<any>localStorage.getItem("firPreForm"));-->
<!--  if(previousValues){-->
<!--        form.genderType= previousValues.hasOwnProperty('genderType') ? previousValues.genderType :  InfoMonitored.customerGenderType;-->
<!--        form.residentTypeId= previousValues.hasOwnProperty('residentTypeId') ? previousValues.residentTypeId : InfoMonitored.loanPlan.residentTypeId  ?  InfoMonitored.loanPlan.residentTypeId :null-->
<!--        form.maritalStatusId= previousValues.hasOwnProperty('maritalStatusId') ? previousValues.maritalStatusId : InfoMonitored.loanPlan.maritalStatusId ?InfoMonitored.loanPlan.maritalStatusId : InfoMonitored.loanPlan.maritalStatusId;-->
<!--        form.isFamilySupervisor= previousValues.hasOwnProperty('isFamilySupervisor') ? previousValues.isFamilySupervisor : InfoMonitored.loanPlan.isFamilySupervisor  ?  InfoMonitored.loanPlan.isFamilySupervisor:null;-->
<!--        form.Phone= previousValues.hasOwnProperty('Phone') ? previousValues.Phone : InfoMonitored.loanPlan.phone?InfoMonitored.loanPlan.phone:null;-->
<!--        form.mobileNo= previousValues.hasOwnProperty('mobileNo') ? previousValues.mobileNo : InfoMonitored.mobileNo.slice(-11) ? InfoMonitored.mobileNo.slice(-11):null;-->
<!--        form.planTypeId= previousValues.hasOwnProperty('planTypeId') ? previousValues.planTypeId : InfoMonitored.loanPlan.planTypeId ?   InfoMonitored.loanPlan.planTypeId:null;-->
<!--        form.educationTypeId= previousValues.hasOwnProperty('educationTypeId') ? previousValues.educationTypeId : InfoMonitored.loanPlan.educationTypeId ?   InfoMonitored.loanPlan.educationTypeId:null;-->
<!--        form.planNoId= previousValues.hasOwnProperty('planNoId') ? previousValues.planNoId : InfoMonitored.planNoId;-->
<!--        form.id= previousValues.hasOwnProperty('id') ? previousValues.id : InfoMonitored.loanPlan.id;-->
<!--        form.cartableId= previousValues.hasOwnProperty('cartableId') ? previousValues.cartableId : InfoMonitored.loanPlan.cartableId;-->
<!--        form.loanId= previousValues.hasOwnProperty('loanId') ? previousValues.loanId : InfoMonitored.loanPlan.loanId;-->
<!--        form.loanSurveyEconomidTypeId= previousValues.hasOwnProperty('loanSurveyEconomidTypeId') ? previousValues.loanSurveyEconomidTypeId : loanSurveyEconomidTypeId;-->
<!--        form.otherPlanNo= previousValues.hasOwnProperty('planTypeId') ? previousValues.planTypeId : InfoMonitored.loanPlan.otherPlanNo;-->
<!--        form.latitude= store.addressform.latitude ? store.addressform.latitude : previousValues.hasOwnProperty('planTypeId') ? previousValues.latitude : InfoMonitored.loanPlan.latitude;-->
<!--        form.longitude=store.addressform.longitude ? store.addressform.longitude : previousValues.hasOwnProperty('longitude') ? previousValues.longitude : InfoMonitored.loanPlan.longitude;-->
<!--        form.address=  store.addressform.address ? store.addressform.address :previousValues.hasOwnProperty('address') ? previousValues.address : InfoMonitored.loanPlan.address;-->
<!--        form.villageName= store.addressform.villageName ? store.addressform.villageName : previousValues.hasOwnProperty('villageName') ? previousValues.villageName : InfoMonitored.loanPlan.villageName;-->
<!--        form.insuranceTypeId= previousValues.hasOwnProperty('insuranceTypeId') ? previousValues.insuranceTypeId : InfoMonitored.loanPlan.insuranceTypeId;-->
<!--        form.workShopCode= previousValues.hasOwnProperty('workShopCode') ? previousValues.workShopCode : InfoMonitored.loanPlan.workShopCode;-->
<!--        form.isValidPlanNo= previousValues.hasOwnProperty('isValidPlanNo') ? previousValues.isValidPlanNo : false;-->
<!--  }-->
<!--}-->

<!--const sumbitForm = () => {-->
<!--  submitted.value = true-->
<!--  if (!v$.value.$invalid) {-->
<!--    if (form.mobileNo.length < 11 || form.Phone.length < 11) {-->
<!--      ToastNotificationService.warn("تلفن همراه یا تلفن ثابت باید 11 رقم باشد");-->
<!--    } else if (!form.Phone.startsWith(0)) {-->
<!--      ToastNotificationService.warn("تلفن ثابت باید با صفر شروع شود");-->
<!--    } else if (form.address === "") {-->
<!--      ToastNotificationService.error("لطفا ادرس را تکمیل کنید");-->
<!--    } else {-->
<!--      store.SetFormOne(form)-->
<!--      router.push({ path: "/survey/StepTow", query: {id:InfoMonitored.id ,loanType:loanSurveyEconomidTypeId }});-->
<!--      localStorage.setItem("firPreForm", JSON.stringify(form))-->
<!--    }-->
<!--  } else {-->
<!--    ToastNotificationService.error("فیلد های اجباری را لطفا تکمیل کنید");-->
<!--  }-->
<!--};-->

<!--onMounted(() => {-->
<!--  Pachvalue()-->
<!--  Mainstore.loadFromLocalStorage();-->
<!--})-->

<!--</script>-->
<script lang="ts" setup>
import CardDetails from "../../components/PaymentDetails.vue";
import SurveyHeader from "../../components/Layouts/surveyHeader.vue";
import { ToastNotificationService } from "~/core/toast-notification-service";
import { useFormStore } from "~/store/Form";
import { useSurveyStore } from "~/store/useSurveyStore";
import { required } from '@vuelidate/validators';
import { useVuelidate } from "@vuelidate/core";
import exportedObjects from '~/core/Enum/baseEnum';
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';


definePageMeta({
  layout: "survey",
});

const formStore = useFormStore();
const surveyStore = useSurveyStore();
const router = useRouter();
const route = useRoute();

const error = ref(false);
const submitted = ref(false);
const loanTypeId = route.query.loanType;
const surveyData = surveyStore.getCartableUserDataById(Number(route.query.id));
const userData = JSON.parse(<any>localStorage.getItem('User-data')) || {};

let previousFormValues = reactive({});

const form = reactive({
  genderType: surveyData.customerGenderType,
  residentTypeId: surveyData.loanPlan.residentTypeId || null,
  maritalStatusId: surveyData.loanPlan.maritalStatusId || null,
  isFamilySupervisor: surveyData.loanPlan.isFamilySupervisor || null,
  phone: surveyData.loanPlan.phone || null,
  mobileNo: surveyData.mobileNo.slice(-11) || null,
  planTypeId: surveyData.loanPlan.planTypeId || null,
  educationTypeId: surveyData.loanPlan.educationTypeId || null,
  planNoId: surveyData.loanPlan.planNoId || null,
  loanId: surveyData.loanPlan.loanId,
  cartableId: surveyData.loanPlan.cartableId,
  latitude: formStore.addressForm.latitude || surveyData.loanPlan.latitude,
  longitude: formStore.addressForm.longitude || surveyData.loanPlan.longitude,
  address: formStore.addressForm.address || surveyData.loanPlan.address,
  villageName: formStore.addressForm.villageName || surveyData.loanPlan.villageName,
  userPlanNo: userData.id,
  insuranceTypeId: surveyData.loanPlan.insuranceTypeId,
  workShopCode: surveyData.loanPlan.workShopCode,
  isValidPlanNo: false,
  loanSurveyEconomicTypeId: loanTypeId,
  otherPlanNo: surveyData.loanPlan.otherPlanNo || null
});

const rules = computed(() => ({
  phone: { required },
  mobileNo: { required },
  planTypeId: { required },
  isValidPlanNo: { required },
  educationTypeId: { required },
  genderType: { required },
  residentTypeId: { required },
  maritalStatusId: { required },
  isFamilySupervisor: { required }
}));

const v$ = useVuelidate(rules, form);

const convertPersianNumbersToEnglish = (input: string): string => {
  const persianToEnglishMap: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5',
    '۶': '6', '۷': '7', '۸': '8', '۹': '9'
  };
  return input.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
};

const navigateToEditAddress = () => {
  localStorage.setItem("formState", JSON.stringify(form));
  router.push({ path: "/navigation/EditAddress", query: { id: surveyData.id, loanType: loanTypeId } });
};

const loadPreviousValues = () => {
  const savedForm = JSON.parse(<any>localStorage.getItem("formState"));
  if (savedForm) {
    Object.assign(form, savedForm);
  }
};

const submitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    if (form.mobileNo.length < 11 || form.phone.length < 11) {
      ToastNotificationService.warn("تلفن همراه یا تلفن ثابت باید 11 رقم باشد");
    } else if (!form.phone.startsWith('0')) {
      ToastNotificationService.warn("تلفن ثابت باید با صفر شروع شود");
    } else if (!form.address) {
      ToastNotificationService.error("لطفا آدرس را تکمیل کنید");
    } else {
      formStore.SetFormOne(form);
      router.push({ path: "/survey/StepTwo", query: { id: surveyData.id, loanType: loanTypeId } });
      localStorage.setItem("formState", JSON.stringify(form));
    }
  } else {
    ToastNotificationService.error("فیلدهای اجباری را لطفا تکمیل کنید");
  }
};

onMounted(() => {
  loadPreviousValues();
  surveyStore.loadFromLocalStorage();
});
</script>
<style lang="scss">
</style>
