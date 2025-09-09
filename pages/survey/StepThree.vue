
<template>
  <surveyHeader @saveform3="Setform" ></surveyHeader>
  <PaymentDetails/>
  <form @submit.prevent="submit()">

    <section class="flex-column form-group">
      <Titel :title="'مصوبه ساخت ساز'"/>
      <div class="px-3 col-12  mb-3 d-flex justify-content-center bg-white py-3 rounded-4">
        <SelectButton v-model="form.constructionApproval"
                      :options="exportedObjects.binaryOptions"
                      :class="{'p-invalid': v$.constructionApproval.$invalid && submitted}"
                      aria-labelledby="basic"
                      class="col-12 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"
                      @click="ConstructionHandelTab(form.constructionApproval)"/>
      </div>

      <div v-if="ConstructionTab === 1">
        <Titel :title="'شرح عملیات'"/>
        <input-text
            inputmode="numeric"
            class=" text-end col-12 mb-2 text-end mt-3"
            id="formGroupExampleInput"
            style="height: 75px"
            maxlength="3"
            :class="{'p-invalid': v$.constructionPercentageProgress.$invalid && submitted}"
            v-model="form.constructionPercentageProgress"
            @input="form.constructionPercentageProgress=ConvertNUM(form.constructionPercentageProgress)"
            placeholder="درصد پیشرفت"
        />
        <textarea
            type="text"
            class="form-control bg-white text-end mb-3 pt-3"
            id="formGroupExampleInput"
            :class="{'p-invalid-textarea': v$.constructionDescription.$invalid && submitted}"
            style="height: 100px"
            :maxlength="499"
            v-model="form.constructionDescription"
            placeholder="شرح عملیات عمرانی"
        />
      </div>
    </section>

    <section class="flex-column px-1 form-group">
      <Titel :title="'وضعیت تجهیرات طبق مصوبه و پرونده'"/>
      <SelectButton v-model="form.isEquipmentBought"
                    :options="exportedObjects.optionsEquipmentBought"
                    aria-labelledby="basic"
                    :class="{'p-invalid': v$.isEquipmentBought.$invalid && submitted}"
                    class="d-flex border-secondary gap-2 flex-direction-row py-2 py-2 bg-white justify-content-center flex-wrap EquipmentBought-titel"
                    optionLabel="name"
                    optionValue="value"
                    @click="EquipmentBoughtHandel(form.isEquipmentBought)"/>

      <div v-if="EquipmentTab === 1"
           class="flex-column px-1">
        <div class="d-flex pt-3  justify-content-around ">
          <SelectButton v-model="form.isFactorMatch"
                        :options="exportedObjects.optionFamilySupervisor"
                        :class="{'p-invalid': v$.isFactorMatch.$invalid && submitted}"
                        aria-labelledby="basic"
                        class="d-flex border-secondary  flex-direction-row col-8 justify-content-center flex-wrap  FactorMatch-button "
                        optionLabel="name"
                        optionValue="value"
          />
          <p>تطابق با فاکتور </p>
        </div>

        <div>
          <Titel :title="'نوع تجهیزات'"/>
          <SelectButton v-model="form.equipmentTypeId"
                        :options="exportedObjects.equipmentTypes"
                        :class="{'p-invalid': v$.equipmentTypeId.$invalid && submitted}"
                        aria-labelledby="basic"
                        class="d-flex border-secondary gap-2 flex-direction-row py-2 bg-white justify-content-center flex-wrap EquipmentBought-titel"
                        optionLabel="value"
                        optionValue="key"
          />
        </div>
        <div>
          <Titel :title="'شرح تجهیزات'"/>
          <textarea type="text"
                    class="form-control bg-white text-end mb-3 pt-3"
                    :class="{'p-invalid-textarea': v$.equipmentDescription.$invalid && submitted}"
                    id="formGroupExampleInput"
                    :maxlength="499"
                    style="height: 75px"
                    v-model="form.equipmentDescription"
          />
        </div>
      </div>
    </section>


    <section class=" px-1 form-group">
      <Titel :title="'گزارش همیار نظارت و وصول مطالبات'"/>
      <textarea type="text"
                class="form-control bg-white text-end mb-3 pt-3"
                v-model="form.surveyReport"
                :maxlength="499"
                :class="{'p-invalid-textarea': v$.surveyReport.$invalid && submitted}"
                style="height: 75px"/>
    </section>

    <section class=" px-1 form-group">
      <Titel :title="'پیشنهاد متقاضی جهت و بهبود کسب وکار'"/>
      <textarea type="text"
                class="form-control bg-white text-end mb-3 pt-3"
                id="formGroupExampleInput"
                style="height: 75px"
                :maxlength="499"
                :class="{'p-invalid-textarea': v$.customerOffer.$invalid && submitted}"
                v-model="form.customerOffer"/>
    </section>

    <section class="px-1 form-group">
      <Titel :title="'گرفتن عکس'"/>
      <div>
        <div class="bg-white position-relative overflow-hidden" style="height: max-content">
          <div class="photo-container p-3 gap-3">
            <div v-for="(image, index) in uploadedImages" :key="index" class="photo-item">
              <img :src="image.url" alt="Uploaded Image" class="photo-width"/>
              <div class="delete-icon" @click="removeImage(index)">
                <img src="/img/img.png" class="text-danger" width="50"/>
              </div>
              <Badge :value="index+1" size="large" severity="success"></Badge>
              <!--              <ProgressBar v-if="image.uploadProgress !== null" :value="image.uploadProgress"></ProgressBar>-->
              <Knob v-if="image.uploadProgress !== null" v-model="image.uploadProgress" :strokeWidth="5" valueTemplate="{value}%" />
            </div>
          </div>
          <label for="fileInput" class="custom-file-upload btn btn-primary rounded-3 bg-secondary mt-5">
            انتخاب عکس
          </label>
          <input id="fileInput" type="file" ref="fileInput" @change="handleFileUpload" multiple style="display: none"/>
        </div>
      </div>
    </section>
    <!-- section تایید  -->
    <section class="form-group px-1">
      <Titel :title="'تایید ثبت'"/>
      <div
          class="px-1 col col-12 align-center pt-1 px-2 justify-content-between">
        <div class="col-12 d-flex gap-5">
          <p class="mx-2 text-black text-center py-2font-checkbox col-9">
            کلیه اطلاعات فوق را با دقت و رعایت حقوق صندوق و امانتداری تکمیل
            کرده ام و در صورت شدن هر گونه انحرافی عواقب ناشی از ان را میپذیرم
          </p>
          <input type="checkbox" class="py-2" v-model="form.confirmation"/>
        </div>
      </div>
    </section>
    <button
        class="d-flex justify-content-center col-11 mx-auto py-3 mt-4 text-white bg-blue-1 rounded-pill p-3 "
        @click="">
      ثبت نظارت
    </button>
    <Dialog v-model:visible="visible" modal :showHeader="false">
      <div class="d-flex align-items-center gap-3 mb-2 mt-4">
        <p class="text-center">خطا در ارسال. یکی از روش های زیر انتخاب کنید</p>
      </div>
      <div class="col-12 d-flex justify-content-center gap-2">
        <button
            class=" rounded-pill border-0  col-6 text-white  bg-danger py-3"
            type="button"
            @click="SendOffline">
          ارسال افلاین
        </button>
        <button
            class="rounded-pill border-0 col-6 bg-success text-white py-3"
            type="button"
            @click="visible = false"
        >
          ارسال آنلاین
        </button>
      </div>
    </Dialog>
    <Dialog v-model:visible="visibleConfirm" modal :showHeader="false">
      <div class="d-flex align-items-center gap-3 mb-2 mt-4">
        <p class="text-center">
          نظارت با موفقیت ذخیره شد. تا ساعت 24 نظارت را به سرور ارسال نمایید
        </p>
      </div>
      <div class="col-12 d-flex justify-content-center gap-2">
        <nuxt-link to="/"
                   class="text-white bg-blue-1 border-0  text-center  col-6 btn-primary text-white py-3">
          تایید
        </nuxt-link>
      </div>
    </Dialog>
  </form>
</template>
<script lang="ts" setup>
import {useFormStore} from "~/store/Form";
import {required} from '@vuelidate/validators';
import {useVuelidate} from "@vuelidate/core";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {CommonServices} from "~/core/base/common-services";
import {ServicesImg} from "~/core/base/Services-Img.ts";
import {BaseApi} from "~/core/base/base-api.ts";
import { useSurveyStore } from "~/store/useSurveyStore";
import exportedObjects from '~/core/Enum/baseEnum';

definePageMeta({
  layout: "survey",
});

let totalUploadedFiles = 0;
let db:any;
let mainform = <any>reactive({})
const Mainstore = useSurveyStore();
const store = useFormStore()
const IsRequest = ref()
const router = useRouter();
const route = useRoute();
const fileInput = ref<any>([]);
const uploadedImages = ref<any>([]);
const ConstructionTab = ref(0);
const currentTab = ref();
const EquipmentTab = ref();
const submitted = ref(false);
const visible = ref(false);
const visibleConfirm = ref(false);
const FinalRegistrationform = localStorage.getItem("FinalRegistrationform");
const FinalRegistrationForm = FinalRegistrationform ? JSON.parse(FinalRegistrationform) : {};
const data = Mainstore.getCartableUserDataById(Number(route.query.loanId));

const LasteSurvey = data.surveDetail!=null ? data.surveDetail : null;

const currentDate = new Date();

const options = {timeZone: 'Asia/Tehran'};

const surveyDate = currentDate.toLocaleString('en-US', options);

const form = ref({
  constructionApproval: FinalRegistrationForm.hasOwnProperty("constructionApproval") ? FinalRegistrationForm.constructionApproval : LasteSurvey ? LasteSurvey.constructionApproval : null,
  surveyReport: FinalRegistrationForm.hasOwnProperty("surveyReport") ? FinalRegistrationForm.surveyReport : LasteSurvey ? LasteSurvey.surveyReport : "",
  customerOffer: FinalRegistrationForm.hasOwnProperty("customerOffer") ? FinalRegistrationForm.customerOffer : LasteSurvey ? LasteSurvey.customerOffer : "",
  isEquipmentBought: FinalRegistrationForm.hasOwnProperty("isEquipmentBought") ? FinalRegistrationForm.isEquipmentBought : LasteSurvey ? LasteSurvey.isEquipmentBought : null,
  isFactorMatch: FinalRegistrationForm.hasOwnProperty("isFactorMatch") ? FinalRegistrationForm.isFactorMatch : LasteSurvey ? LasteSurvey.isFactorMatch : null,
  constructionPercentageProgress: FinalRegistrationForm.hasOwnProperty("constructionPercentageProgress") ? FinalRegistrationForm.constructionPercentageProgress : LasteSurvey ? LasteSurvey.constructionPercentageProgress : null,
  constructionDescription: FinalRegistrationForm.hasOwnProperty("constructionDescription") ? FinalRegistrationForm.constructionDescription : LasteSurvey ? LasteSurvey.constructionDescription : null,
  equipmentTypeId: FinalRegistrationForm.hasOwnProperty("equipmentTypeId") ? FinalRegistrationForm.equipmentTypeId : LasteSurvey ? LasteSurvey.equipmentTypeId : null,
  equipmentDescription: FinalRegistrationForm.hasOwnProperty("equipmentDescription") ? FinalRegistrationForm.equipmentDescription : LasteSurvey ? LasteSurvey.equipmentDescription : null,
  cartableId: data.cartableId,
  surveyDate: surveyDate,
  userId: data.userId,
  confirmation: null,
  guidList: [],
});

const rules = computed(() => {
  return {
    constructionApproval: {required},
    customerOffer: {required},
    surveyReport: {required},
    isEquipmentBought: {required},
    constructionDescription: '',
    constructionPercentageProgress: '',
    equipmentDescription: '',
    equipmentTypeId: '',
    isFactorMatch: ''
  };
})

let v$ = useVuelidate(rules, form);


const setCurrentTab = (Number: number) => {
  currentTab.value = Number;
};
const ConstructionHandelTab = (Number: number) => {
  ConstructionTab.value = Number;
  if (Number === 1 && EquipmentTab.value === 1) {
    const rules = computed(() => {
      return {
        constructionApproval: {required},
        customerOffer: {required},
        surveyReport: {required},
        isEquipmentBought: {required},
        constructionDescription: {required},
        constructionPercentageProgress: {required},
        isFactorMatch: {required},
        equipmentTypeId: {required},
        equipmentDescription: {required},
      };
    })
    v$ = useVuelidate(rules, form);
  }  else if (Number === 0 && EquipmentTab.value === 1) {
    const rules = computed(() => {
      return {
        constructionApproval: {required},
        customerOffer: {required},
        surveyReport: {required},
        isEquipmentBought: {required},
        constructionDescription: '',
        constructionPercentageProgress: '',
        isFactorMatch: {required},
        equipmentTypeId: {required},
        equipmentDescription: {required},
      };
    })
    v$ = useVuelidate(rules, form);
    form.value.constructionPercentageProgress=null
    form.value.constructionDescription=null
  } else if (Number === 1) {
    const rules = computed(() => {
      return {
        constructionApproval: {required},
        customerOffer: {required},
        surveyReport: {required},
        isEquipmentBought: {required},
        constructionDescription: {required},
        constructionPercentageProgress: {required},
        equipmentDescription: '',
        equipmentTypeId: '',
        isFactorMatch: '',
      };
    })
    v$ = useVuelidate(rules, form);
  } else {
    const rules = computed(() => {
      return {
        constructionApproval: {required},
        customerOffer: {required},
        surveyReport: {required},
        isEquipmentBought: {required},
        constructionDescription: '',
        constructionPercentageProgress: '',
        equipmentDescription: '',
        equipmentTypeId: '',
        isFactorMatch: '',
      };
    })
    v$ = useVuelidate(rules, form);
  }
};

const EquipmentBoughtHandel = (Number: number) => {
  EquipmentTab.value = Number;
  if (Number === 1 && ConstructionTab.value === 1) {
    const rules = computed(() => {
      return {
        constructionApproval: {required},
        customerOffer: {required},
        surveyReport: {required},
        isEquipmentBought: {required},
        constructionDescription: {required},
        constructionPercentageProgress: {required},
        isFactorMatch: {required},
        equipmentTypeId: {required},
        equipmentDescription: {required},
      };
    })
    v$ = useVuelidate(rules, form);
  } else if (Number === 1) {
    const rules = computed(() => {
      return {
        constructionApproval: {required},
        customerOffer: {required},
        surveyReport: {required},
        isEquipmentBought: {required},
        isFactorMatch: {required},
        equipmentTypeId: {required},
        equipmentDescription: {required},
        constructionDescription: '',
        constructionPercentageProgress: '',
      };
    })
    v$ = useVuelidate(rules, form);
  } else {
    const rules = computed(() => {
      return {
        constructionApproval: {required},
        customerOffer: {required},
        surveyReport: {required},
        isEquipmentBought: {required},
        constructionDescription: '',
        constructionPercentageProgress: '',
        equipmentDescription: '',
        equipmentTypeId: '',
        isFactorMatch: ''
      };
    })
    form.value.isFactorMatch=null
    form.value.equipmentTypeId=null
    form.value.equipmentDescription=null
    v$ = useVuelidate(rules, form);
  }
};

const submit = () => {
  mainform = store.form
  submitted.value = true
  if (!v$.value.$invalid) {
    if (totalUploadedFiles < 5 && form.value.guidList.length <= 5) {
      ToastNotificationService.error("حداقل 5 عکس بارگزاری کنید");
    } else if (form.value.confirmation === null) {
      ToastNotificationService.error("شرایط ثبت نظارت حتما باید انتخاب شود");
    } else {
      mainform.survey.constructionApproval = form.value.constructionApproval;
      mainform.survey.surveyReport = form.value.surveyReport;
      mainform.survey.customerOffer = form.value.customerOffer;
      mainform.survey.isEquipmentBought = form.value.isEquipmentBought;
      mainform.survey.isFactorMatch = form.value.isFactorMatch;
      mainform.survey.constructionPercentageProgress = form.value.constructionPercentageProgress;
      mainform.survey.constructionDescription = form.value.constructionDescription;
      mainform.survey.equipmentTypeId = form.value.equipmentTypeId;
      mainform.survey.equipmentDescription = form.value.equipmentDescription;
      mainform.survey.guidList = form.value.guidList;
      mainform.survey.cartableId = form.value.cartableId;
      mainform.survey.guidList = form.value.guidList;
      mainform.survey.userId = form.value.userId;
      mainform.survey.surveyDate = form.value.surveyDate;
      if (IsRequest.value == false) {
        SetLoanPlanSurvey(mainform)
      }
      else {
          ToastNotificationService.warn("درحال ارسال عکس لطفا صبر کنید");
       }
    }

  } else {
    ToastNotificationService.error("فیلد های اجباری را لطفا تکمیل کنید");
  }
};

const SetLoanPlanSurvey = async (body: any) => {
  MakeResponse.makeServerResponse(CommonServices.SetLoanPlanSurvey(body), true, result => {
    if(result==='ERR_NETWORK'){
      visible.value = true
    }
    else if(result && result.serverErrors.length==0) {
                  ToastNotificationService.success("نظارت با موفقیت ثبت شد");
                  setTimeout(() => {
                    router.push("/");
                    store.form.survey.planIndustrialSurvey=null
                    store.form.survey.planGardenSurvey=null
                    store.form.survey.planLivestockSurvey=null
                    store.form.survey.planServiceSurvey=null
                    localStorage.removeItem("firPreForm");
                    localStorage.removeItem("SecPreForm");
                    localStorage.removeItem("FinalRegistrationform");

                  }, 8000);
                }
  },true);
}


const SendOffline = () => {
  let key = `userId_${route.query.id}`;
  localStorage.setItem(key, JSON.stringify(mainform));
  localStorage.removeItem("customerform");
  localStorage.removeItem("SecPreForm");
  localStorage.removeItem("FinalRegistrationform");
  visible.value = false
  visibleConfirm.value = true;
};

const Setform=()=>{
  localStorage.setItem("FinalRegistrationform", JSON.stringify(form.value));
}

const handleFileUpload = async (event:any) => {
  const files = fileInput.value.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    totalUploadedFiles++;
    if (!file.type.startsWith("image/jpeg")) {
      ToastNotificationService.warn("نوع فایل باید jpg باشد");
      totalUploadedFiles--;
      return;
    }
    const compressedFile =<any> await compressImage(file);
    uploadedImages.value.push({
      url: compressedFile.dataURL,
      file: compressedFile,
    });
    SetSurveyImage(compressedFile,uploadedImages.value.length - 1);
  }
};

const compressImage = (file:any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event:any) => {
      const img =<any> new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx =<any> canvas.getContext("2d");
        const maxWidth = 800;
        const maxHeight = 600;
        let newWidth = img.width;
        let newHeight = img.height;
        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = (img.height * maxWidth) / img.width;
        }
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = (img.width * maxHeight) / img.height;
        }
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
            (blob:any) => {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
              });
              resolve({
                dataURL: URL.createObjectURL(compressedFile),
                file: compressedFile,
              });
            },
            "image/jpeg",
            0.8
        );
      };
    };
    reader.readAsDataURL(file);
  });
};

const SetSurveyImage = async (file:any, index:any) => {
  IsRequest.value=true
  const formData = new FormData();
  formData.append("postedFile", file.file);
  MakeResponse.makeServerResponse(CommonServices.SetSurveyImage(formData), false, result => {
    uploadedImages.value[index].uploadProgress = BaseApi.progress.value;
    if(result==='ERR_NETWORK'){
      uploadedImages.value[index].uploadProgress = null;
      IsRequest.value=false
      ToastNotificationService.warn("خطا در برقراری شبکه عکس در حافظه ذخیره شد ",8000 );
          SaveImgDB(file);
    }
    else if(result&& result.result) {
      uploadedImages.value[index].uploadProgress = null;

      form.value.guidList.push(result.data);
      IsRequest.value=false
      ToastNotificationService.success("عکس با موفقیت ارسال شد ",);
    }
  },false);
};


const openDatabase =()=>{
  ServicesImg.openDatabase()
}

const SaveImgDB = (file:any) => {
  ServicesImg.saveImgTodDB(file,route.query.id,data.loanId)
};

const removeImage = (index:any) => {
  const removedImage = uploadedImages.value[index];
  uploadedImages.value.splice(index, 1);
  totalUploadedFiles--;
  form.value.guidList.splice(index, 1);
  ServicesImg.removeImgDB(removedImage.file)
};

const ConvertNUM = (input:any) => {
  if (input>100){
    ToastNotificationService.warn("اعداد بیشتر از 100 نمیتوان وارد کرد");
    return "";
  }

  if (!input) {
    return "";
  }
  if (!/^[۰-۹0-9]+$/.test(input)) {
    ToastNotificationService.warn("از اعداد فارسی یا انگلیسی استفاده کنید ");
    return ""
  }

  const persianToEnglishMap =<any> {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9'
  };
  const convertedString = input.replace(/[۰-۹]/g, (match:any) => persianToEnglishMap[match]);
  return parseInt(convertedString, 10);
};


onMounted(() => {
  store.LoadForm()
  Mainstore.loadFromLocalStorage();
  setCurrentTab(form.value.planActivationTypeId)
  ConstructionHandelTab(form.value.constructionApproval)
  EquipmentBoughtHandel(form.value.isEquipmentBought)
  openDatabase()
})

</script>

<style lang="scss">

</style>
