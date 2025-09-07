<template>
  <surveyHeader/>
  <PaymentDetails/>
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
          :class="{'p-invalid': v$.Phone.$invalid && submitted}"
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
        <p   v-if="surveyData.loanPlan"> {{ surveyData.loanPlan.planNo.name }}</p>
      </div>
      <div class="px-2 d-flex  flex-reverse flex-row-reverse gap-4">
        <div class="d-flex  gap-3">
          <Checkbox v-model="form.isValidPlanNo"  binary/>
          <label > در صورت مغایرت, تیک رشته فعالیت  را علامت بزنید  </label>
        </div>
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
<script lang="ts" setup>
import { ToastNotificationService } from "~/core/toast-notification-service";
import { useFormStore } from "~/store/Form";
import { useSurveyStore } from "~/store/useSurveyStore";
import { required } from '@vuelidate/validators';
import { useVuelidate } from "@vuelidate/core";
import exportedObjects from '~/core/Enum/baseEnum';


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
  genderType: surveyData.loanPlan.genderType,
  residentTypeId: surveyData?.loanPlan.residentTypeId==0?null:surveyData?.loanPlan.residentTypeId,
  maritalStatusId: surveyData.loanPlan.maritalStatusId ,
  isFamilySupervisor: surveyData.loanPlan.isFamilySupervisor ,
  mobileNo:surveyData.mobileNo? surveyData.mobileNo.slice(-11):surveyData.loanPlan.mobileNo || null,
  planTypeId: surveyData.loanPlan.planTypeId || null,
  educationTypeId: surveyData.loanPlan.educationTypeId || null,
  planNoId: surveyData.loanPlan.planNoId || null,
  loanId: surveyData.loanPlan.loanId,
  cartableId: surveyData.loanPlan.cartableId,
  latitude:  surveyData.loanPlan.latitude,
  longitude:  surveyData.loanPlan.longitude,
  address:  surveyData.loanPlan.address,
  villageName:  surveyData.loanPlan.villageName,
  insuranceTypeId: surveyData.loanPlan.insuranceTypeId,
  workShopCode: surveyData.loanPlan.workShopCode,
  isValidPlanNo: false,
  otherPlanNo: surveyData.loanPlan.otherPlanNo || null,
  Phone:  surveyData.loanPlan.phone,
  id:  surveyData.loanPlan.id,
  loanSurveyEconomidTypeId: loanTypeId,
  UserOtherPlanNo: userData.id,
  UserPlanNoText: null,
  planNoDto: null,
});

const rules = computed(() => ({
  Phone: { required },
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
  localStorage.setItem("firPreForm", JSON.stringify(form));
  router.push({ path: "/navigation/EditAddress", query: { id: surveyData.id, loanType: loanTypeId } });
};

const loadPreviousValues = () => {
  const savedForm = JSON.parse(<any>localStorage.getItem("firPreForm"));
  if (savedForm) {
    Object.assign(form, savedForm);
    form.latitude= formStore?.addressForm?.latitude? formStore.addressForm.latitude: savedForm.latitude
        form.longitude=  formStore?.addressForm?.longitude? formStore.addressForm?.longitude :savedForm.longitude
        form.address= formStore?.addressForm?.address ? formStore.addressForm.address : savedForm.address
        form.villageName=formStore?.addressForm?.villageName ? formStore.addressForm.villageName : savedForm.villageName
  }
};

const submitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    if (form.mobileNo.length < 11 || form.Phone.length < 11) {
      ToastNotificationService.warn("تلفن همراه یا تلفن ثابت باید 11 رقم باشد");
    } else if (!form.Phone.startsWith('0')) {
      ToastNotificationService.warn("تلفن ثابت باید با صفر شروع شود");
    } else if (!form.address) {
      ToastNotificationService.error("لطفا آدرس را تکمیل کنید");
    } else {
      formStore.SetFormOne(form);
      router.push({ path: "/survey/StepTwo", query: { id: surveyData.id, loanType: loanTypeId } });
      localStorage.setItem("firPreForm", JSON.stringify(form));
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
