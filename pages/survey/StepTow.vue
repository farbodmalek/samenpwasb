<template>
    <surveyHeader @saveform2="Setform" ></surveyHeader>
  <Carddetails/>
  <form @submit.prevent="NextstepHandel()">
    <section v-if="loanSurvey == 1"
             class="flex-column px-1">
      <Titel :title="'وضعیت اماری دامی'"/>
      <div class="d-flex  form-group  ">
        <SelectButton v-model="form.LivestockTypeId"
                      :class="{'p-invalid': v$.LivestockTypeId.$invalid && submitted}"
                      :options="SurveyBasedata.livestockTypes"
                      aria-labelledby="basic"
                      class=" d-flex border-secondary gap-2 flex-direction-row  justify-content-center flex-wrap group-titel"
                      optionLabel="value"
                      @click="LivestockTab(form.LivestockTypeId)"
                      optionValue="key"/>
      </div>
      <div
        class="mb-3 px-0 d-flex p-2 col-12 flex-wrap justify-content-center pos"
        v-if="[1,2].includes(form.LivestockTypeId)">
        <input-text
          :placeholder="  form.LivestockTypeId===1 ?   'گاو گوشتی' : form.LivestockTypeId===2? 'تعداد نرها': null "
          class="  text-end col-12  text-end"
          v-model="form.NumberOfMaleLivestock"
          :class="{'p-invalid': v$.NumberOfMaleLivestock.$invalid && submitted}"
          inputmode="numeric"
          @input="form.NumberOfMaleLivestock=ConvertNUM(form.NumberOfMaleLivestock)"
            maxlength="3"
          />

        <input-text
            @input="form.NumberOfFemaleLivestock=ConvertNUM(form.NumberOfFemaleLivestock)"
          :placeholder="  form.LivestockTypeId===1 ?   ' گاو شیرده' : form.LivestockTypeId===2? ' تعداد ماده ها': null "
          :class="{'p-invalid': v$.NumberOfFemaleLivestock.$invalid && submitted}"
          class=" text-end col-12  text-end mt-3"
          v-model="form.NumberOfFemaleLivestock"
          inputmode="numeric"
            maxlength="3"
        />
      </div>
      <div class="mb-3 px-0 d-flex p-2 col-12 flex-wrap justify-content-center pos"
           v-if="[3,4,5,7,8,9,6].includes(form.LivestockTypeId)">
        <input-text
            @input="form.NumberOfMaleLivestock=ConvertNUM(form.NumberOfMaleLivestock)"
          :placeholder="  form.LivestockTypeId===6 ?'تعداد کندو' : [3,4,5,7,8,9,6].includes(form.LivestockTypeId)? ' دام ها': null "
          class="text-end col-12 border-1 border-black  "
          v-model="form.NumberOfMaleLivestock"
          :class="{'p-invalid': v$.NumberOfMaleLivestock.$invalid && submitted}"
          inputmode="numeric"
            maxlength="3"
        />

      </div>
    </section>

    <section v-if="loanSurvey == 2 "
             class="flex-column px-1">
      <Titel :title="'نوع مالکیت'"/>
      <div class="px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3   rounded-4">
        <SelectButton v-model="form.OwnerTypeId"
                      :class="{'p-invalid': v$.OwnerTypeId.$invalid && submitted}"
                      :options="SurveyBasedata.ownerTypes"
                      aria-labelledby="basic"
                      class="col-12 d-flex sec-titel"
                      optionLabel="value"
                      optionValue="key"/>
      </div>
    </section>

    <section v-if="loanSurvey == 3 || loanSurvey == 4">
      <Titel :title="'مجوز کار'"/>
      <div class="px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3 rounded-4">
        <SelectButton v-model="form.HasWorkPermission"
                      :class="{'p-invalid': v$.HasWorkPermission.$invalid && submitted}"
                      :options="optionsPresence"
                      aria-labelledby="basic"
                      class="col-12 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"/>
      </div>
    </section>

    <section class=" col-12 d-flex align-center pt-1 flex-column mb-2">
      <Titel :title="'وضعیت بیمه'"/>
      <div class="mx-3">
        <div class="d-flex justify-content-center bg-white p-2 pt-3">
          <SelectButton v-model="form.Isinsurance"
                                      :options="optionsInsurance1"
                                      aria-labelledby="basic"
                                      class="col-9 d-flex sec-titel"
                                      optionLabel="name"
                                      optionValue="value"
                            :class="{'p-invalid': v$.Isinsurance.$invalid && submitted}"
                                      @click="InsuranceTabHadel(form.Isinsurance)"/>
          <p class="py-2 col-3 text-center">لیست بیمه</p>
        </div>

        <div class="d-flex justify-content-center bg-white p-2 col-12"
             v-if="Tab === 1">
          <div class="nav nav-pills px-2 col-9">
            <select
              class="form-select  border-1 rounded-3 text-start"
              style="height: 45px"
              :class="{'p-invalid-select': v$.insuranceTypeId.$invalid && submitted}"
              v-model="form.insuranceTypeId">
              <option class="text-end" value="1">تامین اجتماعی</option>
              <option class="text-end" value="2">عشایری</option>
            </select>
          </div>
          <label class="py-2 text-center col-3">نوع بیمه</label>
        </div>

        <div class="d-flex justify-content-center bg-white p-2 col-12 flex-wrap align-items-center"
             v-if="Tab === 1">
          <div class="px-2 col-9">
              <input-text
                  @input="form.workShopCode=ConvertNUM(form.workShopCode)"
                  v-model="form.workShopCode"
                  :class="{'p-invalid': v$.workShopCode.$invalid && submitted}"
                  class="form-group input-group border-1 border-black rounded-3"
                  inputmode="numeric"
                  maxlength="10"
                  placeholder="مانند 123456"
                  style="height: 45px"
                  type="text"
              />
          </div>
          <label class="py-2 text-center col-3">کد کارگاه</label>
        </div>

        <div class="d-flex justify-content-center bg-white p-2 col-12 flex-wrap align-items-center "
             v-if="Tab === 1">
          <div class="px-2 col-9">
            <input-text
                @input="form.numberOfInsurdPerson=ConvertNUM(form.numberOfInsurdPerson)"
                inputmode="numeric"
              type="text"
                maxlength="3"
              placeholder="مانند 123456"
              class="form-group input-group border-1 border-black rounded-3"
              v-model="form.numberOfInsurdPerson"
              :class="{'p-invalid': v$.numberOfInsurdPerson.$invalid && submitted}"
              :useGrouping="false"
              style="height: 45px"
            />
          </div>
          <label class="py-1 text-center col-3">تعداد بیمه شده</label>
        </div>

      </div>
    </section>


    <section class="flex-column px-1 form-group">
      <Titel :title="'فعال بودن طرح'"/>
      <SelectButton v-model="form.planActivationTypeId"
                    :options="SurveyBasedata.planActivationTypes"
                    :class="{'p-invalid': v$.planActivationTypeId.$invalid && submitted}"
                    aria-labelledby="basic"
                    class="d-flex border-secondary gap-2 flex-direction-row py-2 bg-white  justify-content-center flex-wrap  EquipmentBought-titel planActivation-Button "
                    optionLabel="value"
                    optionValue="key"
                    @click="setCurrentTab(form.planActivationTypeId)"/>
      <div v-if="currentTab === 3"
           class="d-flex justify-content-between mt-4 pt-1 px-2 col-12 text-center">
        <p class="custom-input col-3  text-white bg-blue-1 py-2 rounded-5  "
           type="text">انتخاب تاریخ</p>
        <date-picker
            v-model="form.endOfActivationDate"
            custom-input=".custom-input"
            display-format="YYYY/MM/DD"
            format="YYYY/MM/DD"
        />
        <p class="py-2 fw-bold text-black date">{{ form.endOfActivationDate }}:تاریخ اتمام مهلت فعال بودن </p>
      </div>
    </section>


    <section class="flex-column">
      <Titel :title="'وضعیت اشتغال'"/>
      <div class="mb-3 px-3 d-flex form-group p-2 col-12 flex-wrap justify-content-center">
        <input-text
            @input="form.numberOfJobsCreated=ConvertNUM(form.numberOfJobsCreated)"
            inputmode="numeric"
          placeholder=" نفر"
          style="height: 50px"
          maxlength="3"
          class=" input-group text-center col-12 border-1 border-black rounded-3 "
          v-model="form.numberOfJobsCreated"
          :class="{'p-invalid': v$.numberOfJobsCreated.$invalid && submitted}"
        />
      </div>
    </section>

    <section v-if="loanSurvey == 1"
             class="flex-column">
      <Titel :title="'دفترچه دامداری'"/>
      <div class="px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3   rounded-4">
        <SelectButton v-model="form.LivestockBooklet"
                      :options="optionsLivestockBooklet"
                      aria-labelledby="basic"
                      :class="{'p-invalid': v$.LivestockBooklet.$invalid && submitted}"
                      class="col-12 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"/>
      </div>
    </section>

    <section v-if="loanSurvey == 1"
             class="flex-column">
      <Titel :title="'پروانه دامداری'"/>
      <div class="px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3   rounded-4">
        <SelectButton v-model="form.LivestockLicense"
                      :class="{'p-invalid': v$.LivestockLicense.$invalid && submitted}"
                      :options="optionsInsurance"
                      aria-labelledby="basic"
                      class="col-12 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"/>
      </div>
    </section>

    <section v-if="loanSurvey == 1"
             class="flex-column">
      <Titel :title="'بیمه نامه دام'"/>
      <div class="px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3   rounded-4">
        <SelectButton v-model="form.LivestockInsurance"
                      :options="optionsPresence"
                      :class="{'p-invalid': v$.LivestockInsurance.$invalid && submitted}"
                      aria-labelledby="basic"
                      class="col-12 d-flex sec-titel"
                      optionLabel="name"
                      @click="setCalenderLivestock(form.LivestockInsurance)"
                      optionValue="value"/>
      </div>
      <div v-if="calender === 1">
        <div
          class="d-flex justify-content-between mt-4 pt-1 px-2 col-12 text-center">
          <p class="custom-input col-3  text-white bg-blue-1 py-2 rounded-5  "
             type="text">انتخاب تاریخ</p>
          <date-picker
              v-model="form.InsuranceDate"
              custom-input=".custom-input"
              display-format="YYYY/MM/DD"
              format="YYYY/MM/DD"
          />
          <p class="py-2 fw-bold text-black data">
            {{ form.InsuranceDate }}:تاریخ بیمه نامه
          </p>
        </div>
        <div
          class="mb-3 px-3 d-flex p-2 col-12 flex-wrap justify-content-center pos">
          <input-text
              @input="form.NumberOfInsuredLivestock=ConvertNUM(form.NumberOfInsuredLivestock)"
              inputmode="numeric"
              maxlength="3"
            type="text "
            placeholder="تعداد دام بیمه شده"
            class="form-group input-group border-1 border-black rounded-3"
            v-model="form.NumberOfInsuredLivestock"
          />
        </div>
      </div>
    </section>

    <section v-if="loanSurvey == 2 "
             class="flex-column">
      <Titel :title="'نوع محصول'"/>
      <div class="px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3   rounded-4">
        <SelectButton v-model="form.ProductTypeId"
                      :options="SurveyBasedata.productTypes"
                      :class="{'p-invalid': v$.ProductTypeId.$invalid && submitted}"
                      aria-labelledby="basic"
                      class="col-12 d-flex sec-titel"
                      optionLabel="value"
                      optionValue="key"/>
      </div>
    </section>

    <section v-if="loanSurvey == 2"
             class="flex-column">
      <Titel :title="'اطلاعات زمین'"/>
      <div class="mb-3 px-3 d-flex p-2 col-12 flex-wrap justify-content-center pos">
        <input-text
            @input="form.LandArea=ConvertNUM(form.LandArea)"
          type="text "
          placeholder=" وسعت زمین"
          style="height: 50px"
          class="form-group input-group border-1 border-black rounded-3"
          v-model="form.LandArea"
          :class="{'p-invalid': v$.LandArea.$invalid && submitted}"
          inputmode="numeric"
            maxlength="122"
        />
        <input-text
            @input="form.CultivatedLandArea=ConvertNUM(form.CultivatedLandArea)"
          type="text"
          placeholder="میزان کشت"
          style="height: 50px"
          class="form-group input-group border-1 border-black rounded-3"
          v-model="form.CultivatedLandArea"
          :class="{'p-invalid': v$.CultivatedLandArea.$invalid && submitted}"
          inputmode="numeric"
        />
      </div>
    </section>

    <section v-if="loanSurvey == 2"
             class="flex-column">
      <Titel :title="'بیمه محصولات'"/>
      <div class="px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3   rounded-4">
        <SelectButton v-model="form.HasAgriculturalInsurance"
                      :options="optionsInsurance"
                      :class="{'p-invalid': v$.HasAgriculturalInsurance.$invalid && submitted}"
                      aria-labelledby="basic"
                      class="col-12 d-flex sec-titel"
                      optionLabel="name"
                      optionValue="value"/>
      </div>
      <div v-if="AgriculturalCalender === 1">
        <div
          class="d-flex justify-content-between mt-4 pt-1 px-2 col-12 text-center">
          <p class="custom-input col-3  text-white bg-blue-1 py-2 rounded-5  "
             type="text">انتخاب تاریخ</p>
          <date-picker
              v-model="form.InsuranceDate"
              custom-input=".custom-input"
              display-format="jYYYY/jMM/jDD"
              format="jYYYY/jMM/jDD"
          />
          <p class="py-2 fw-bold text-black date">{{ form.InsuranceDate }}:تاریخ بیمه نامه </p>
        </div>
      </div>
    </section>

    <section v-if="loanSurvey == 3 || loanSurvey == 4"
             class="flex-column px-1">
      <Titel :title="'نوع مالکیت'"/>
      <div class="px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3   rounded-4">
        <SelectButton v-model="form.OwnerTypeId"
                      :class="{'p-invalid': v$.OwnerTypeId.$invalid && submitted}"
                      :options="SurveyBasedata.ownerTypes"
                      aria-labelledby="basic"
                      class="col-12 d-flex sec-titel"
                      optionLabel="value"
                      optionValue="key"/>
      </div>
    </section>

<!--    <section class="flex-column px-1" v-if="loanSurvey == 3 || loanSurvey == 4">-->
<!--      <Titel :title="'حضور وام گیرنده در محل کسب کار'"/>-->
<!--      <div class=" px-3 col-12 form-group mb-3 d-flex justify-content-center bg-white  px-2 py-3   rounded-4">-->
<!--        <SelectButton v-model="form.PresenceTypeId"-->
<!--                      :class="{'p-invalid': v$.PresenceTypeId.$invalid && submitted}"-->
<!--                      :options="SurveyBasedata.presenceTypes"-->
<!--                      aria-labelledby="basic"-->
<!--                      class="col-12 d-flex sec-titel"-->
<!--                      optionLabel="value"-->
<!--                      optionValue="key"/>-->
<!--      </div>-->
<!--    </section>-->

    <div class="d-grid col-11 mx-auto mb-5 mt-3">
      <button
        class="text-white bg-blue-1 rounded-pill p-3">
        بعدی
      </button>
    </div>

  </form>
</template>
<script lang="ts" setup>
import Carddetails from "~/components/PaymentDetails.vue";
import DatePicker from 'vue3-persian-datetime-picker';
import SelectButton from "primevue/selectbutton";
import {required} from '@vuelidate/validators';
import {useVuelidate} from "@vuelidate/core";
import {ToastNotificationService} from "~/core/toast-notification-service";
import Titel from "~/components/Titel.vue";
import {Useform} from "~/store/Form";
import surveyHeader from "~/components/Layouts/surveyHeader.vue";


definePageMeta({
  layout: "survey",
});


const optionsPresence = ref([
  {name: 'ندارد ', value: 0},
  {name: 'دارد', value: 1},
]);

const optionsInsurance = ref([
  {name: 'ندارد ', value: 0},
  {name: 'دارد', value: 1},
]);
const optionsInsurance1 = ref([
  {name: 'ندارد ', value: 0},
  {name: 'دارد', value: 1},
]);

const optionsLivestockBooklet = ref([
  {name: 'ندارد ', value: 0},
  {name: 'دارد', value: 1},
]);

const Setform=()=>{
  localStorage.setItem("SecPreForm", JSON.stringify(form));
}



const router = useRouter();
const route = useRoute();
const submitted = ref(false);
const Tab = ref();
const animalsTab = ref(1);
const calender = ref();
const store=Useform()
const currentTab = ref();
const AgriculturalCalender = ref()
const insuranceTabAgricultural = ref();
const loanSurvey =<any> route.query.loanType;
const SurveyBasedata = JSON.parse(<any>localStorage.getItem("SurveyBaseInfo"));
const Cartables = JSON.parse(<any>localStorage.getItem("Cartables"));
let InfoMonitored = <any>ref('');
const userdata = Cartables.find((item:any) => item.id === Number(route.query.id));
if (userdata) {
  InfoMonitored = userdata;
}
const SurveysList = JSON.parse(<any>localStorage.getItem("SurveysList"));
const filteredSurveys = SurveysList.filter((item:any) => item.id === Number(InfoMonitored.loanId))
const LasteSurvey =  filteredSurveys[0];
// const LasteSurvey =  null;
let previousValues = <any>{};

const form = reactive({
  HasWorkPermission:  LasteSurvey ? LasteSurvey.hasWorkPermission : null,
  insuranceTypeId:  LasteSurvey ? LasteSurvey.insuranceTypeId : null,
  workShopCode:  LasteSurvey ? LasteSurvey.workShopCode : "",
  numberOfInsurdPerson:  LasteSurvey ? LasteSurvey.numberOfInsurdPerson : null,
  numberOfJobsCreated:  LasteSurvey ? LasteSurvey.numberOfJobsCreated : "",
  OwnerTypeId:  null,
  planActivationTypeId:  null,
  endOfActivationDate : LasteSurvey ?LasteSurvey.endOfActivationDate:null,
  Isinsurance:  LasteSurvey ? LasteSurvey.workShopCode == 0 ? 0 : 1 : null,
  Id:  LasteSurvey ? LasteSurvey.Id : 0,
  SurveyId:  LasteSurvey ? LasteSurvey.SurveyId : 0,
  ProductTypeId:  LasteSurvey ? LasteSurvey.productTypeId : null,
  LandArea: LasteSurvey ? LasteSurvey.landArea : "",
  CultivatedLandArea:  LasteSurvey ? LasteSurvey.cultivatedLandArea : "",
  HasAgriculturalInsurance:  LasteSurvey ? LasteSurvey.hasAgriculturalInsurance : null,
  EndOfAgriculturalInsurance:  LasteSurvey ? LasteSurvey.EndOfAgriculturalInsurance : null,
  insuranceTabAgricultural:  LasteSurvey ? LasteSurvey.numberOfJobsCreated == 0 ? 0 : 1 : null,
  NumberOfMaleLivestock:  null,
  NumberOfFemaleLivestock: null,
  LivestockTypeId: null,
  ID:  LasteSurvey ? LasteSurvey.ID : 0,
  LivestockLicense:  LasteSurvey ? LasteSurvey.livestockLicense : null,
  LivestockInsurance:  LasteSurvey ? LasteSurvey.livestockInsurance : null,
  InsuranceDate:  LasteSurvey ? LasteSurvey.InsuranceDate : null,
  NumberOfInsuredLivestock:  LasteSurvey ? LasteSurvey.hasWorkPermission : null,
  LivestockBooklet:  LasteSurvey ? LasteSurvey.hasWorkPermission : null,
});


const setCurrentTab = (Number: number) => {
  currentTab.value = Number;
  form.endOfActivationDate=null
};

const rules = computed(() => {
  if (loanSurvey == 1) {
    return {
      LivestockTypeId: {required},
      planActivationTypeId: {required},
      numberOfJobsCreated: {required},
      LivestockInsurance: {required},
      LivestockLicense: {required},
      LivestockBooklet: {required},
      NumberOfMaleLivestock: '',
      Isinsurance:{required},
      NumberOfFemaleLivestock: ''

    };
  } else if (loanSurvey == 2) {
    return {
      HasAgriculturalInsurance: {required},
      planActivationTypeId: {required},
      numberOfJobsCreated: {required},
      OwnerTypeId: {required},
      ProductTypeId: {required},
      LandArea: {required},
      CultivatedLandArea: {required},
      insuranceTypeId: '',
      workShopCode: '',
      Isinsurance:{required},
      numberOfInsurdPerson: '',
    };
  } else if (loanSurvey == 3 || 4) {
    return {
      HasWorkPermission: {required},
      numberOfJobsCreated: {required},
      OwnerTypeId: {required},
      planActivationTypeId: {required},
      insuranceTypeId: '',
      workShopCode: '',
      Isinsurance:{required},
      numberOfInsurdPerson: '',
    };
  }
});


let v$ = useVuelidate(rules, form);

const InsuranceTabHadel = (tabNumber:any) => {
  Tab.value = tabNumber;
  if (tabNumber && loanSurvey == 3 ) {
    const rules1 = computed(() => {
      return {
        HasWorkPermission: {required},
        Isinsurance:{required},
        numberOfJobsCreated: {required},
        OwnerTypeId: {required},
        planActivationTypeId: {required},
        insuranceTypeId: {required},
        workShopCode: {required},
        numberOfInsurdPerson: {required},
      };
    });
    v$ = useVuelidate(rules1, form);
  }
  else if (!tabNumber &&  loanSurvey == 3 ) {

    const rules1 = computed(() => {
      return {
        HasWorkPermission: {required},
        Isinsurance:{required},
        numberOfJobsCreated: {required},
        OwnerTypeId: {required},
        planActivationTypeId: {required},
        insuranceTypeId: '',
        workShopCode: '',
        numberOfInsurdPerson: '',
      };
    });
    form.insuranceTypeId = null
    form.workShopCode = null
    form.numberOfInsurdPerson = null
    v$ = useVuelidate(rules1, form);
  }
  if (tabNumber && loanSurvey ==  4) {
    const rules1 = computed(() => {
      return {
        HasWorkPermission: {required},
        Isinsurance:{required},
        numberOfJobsCreated: {required},
        OwnerTypeId: {required},
        planActivationTypeId: {required},
        insuranceTypeId: {required},
        workShopCode: {required},
        numberOfInsurdPerson: {required},

      };
    });
    v$ = useVuelidate(rules1, form);
  }
  else if (!tabNumber &&  loanSurvey ==  4) {

    const rules1 = computed(() => {
      return {
        HasWorkPermission: {required},
        Isinsurance:{required},
        numberOfJobsCreated: {required},
        OwnerTypeId: {required},
        planActivationTypeId: {required},
        insuranceTypeId: '',
        workShopCode: '',
        numberOfInsurdPerson: '',
      };
    });
    form.insuranceTypeId = null
    form.workShopCode = null
    form.numberOfInsurdPerson = null
    v$ = useVuelidate(rules1, form);
  }
  if (tabNumber && loanSurvey == 2) {
    const rules1 = computed(() => {
      return {
        HasAgriculturalInsurance: {required},
        planActivationTypeId: {required},
        Isinsurance:{required},
        numberOfJobsCreated: {required},
        OwnerTypeId: {required},
        ProductTypeId: {required},
        LandArea: {required},
        CultivatedLandArea: {required},
        insuranceTypeId: {required},
        workShopCode: {required},
        numberOfInsurdPerson: {required},
      };
    });
    v$ = useVuelidate(rules1, form);
  }
  else if (!tabNumber && loanSurvey == 2) {
    const rules1 = computed(() => {
      return {
        HasAgriculturalInsurance: {required},
        planActivationTypeId: {required},
        Isinsurance:{required},
        numberOfJobsCreated: {required},
        OwnerTypeId: {required},
        ProductTypeId: {required},
        LandArea: {required},
        CultivatedLandArea: {required},
        insuranceTypeId: '',
        workShopCode: '',
        numberOfInsurdPerson: '',
      };
    });
    form.insuranceTypeId = null
    form.workShopCode = null
    form.numberOfInsurdPerson = null
    v$ = useVuelidate(rules1, form);
  }else if (tabNumber && loanSurvey == 1 && [3, 4, 5, 7, 8, 9, 6].includes(form.LivestockTypeId)) {
    const rules1 = computed(() => {
      return {
        LivestockTypeId: {required},
        planActivationTypeId: {required},
        Isinsurance:{required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        numberOfJobsCreated: {required},
        insuranceTypeId: {required},
        workShopCode: {required},
        numberOfInsurdPerson: {required},
        NumberOfMaleLivestock: {required},
        NumberOfFemaleLivestock: ''
      };
    });
    v$ = useVuelidate(rules1, form);
  }else if (!tabNumber && loanSurvey == 1 && [3, 4, 5, 7, 8, 9, 6].includes(form.LivestockTypeId)) {
    const rules1 = computed(() => {
      return {
        LivestockTypeId: {required},
        planActivationTypeId: {required},
        Isinsurance:{required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        numberOfJobsCreated: {required},
        insuranceTypeId: '',
        workShopCode: '',
        numberOfInsurdPerson: '',
        NumberOfMaleLivestock: {required},
        NumberOfFemaleLivestock: ''
      };
    });
    form.insuranceTypeId = null
    form.workShopCode = null
    form.numberOfInsurdPerson = null
    v$ = useVuelidate(rules1, form);
  }else if (tabNumber && loanSurvey == 1 && [1, 2].includes(form.LivestockTypeId)) {
    const rules1 = computed(() => {
      console.log(15)
      return {
        NumberOfFemaleLivestock: {required},
        planActivationTypeId: {required},
        NumberOfMaleLivestock: {required},
        LivestockTypeId: {required},
        numberOfJobsCreated: {required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        Isinsurance:{required},
        insuranceTypeId: {required},
        workShopCode: {required},
        numberOfInsurdPerson: {required},
      };
    });
    form.insuranceTypeId = null
    form.workShopCode = null
    form.numberOfInsurdPerson = null
    v$ = useVuelidate(rules1, form);
  }else if (!tabNumber && loanSurvey == 1 &&[1, 2].includes(form.LivestockTypeId)) {
    const rules1 = computed(() => {
      return {
        NumberOfFemaleLivestock: {required},
        planActivationTypeId: {required},
        NumberOfMaleLivestock: {required},
        LivestockTypeId: {required},
        numberOfJobsCreated: {required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        Isinsurance:{required},
        insuranceTypeId: '',
        workShopCode: '',
        numberOfInsurdPerson: '',
      };
    });
    v$ = useVuelidate(rules1, form);
  }
  else if (tabNumber && loanSurvey == 1) {
    const rules1 = computed(() => {
      return {
        LivestockTypeId: {required},
        planActivationTypeId: {required},
        Isinsurance:{required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        numberOfJobsCreated: {required},
        insuranceTypeId: {required},
        workShopCode: {required},
        numberOfInsurdPerson: {required},
        NumberOfMaleLivestock: '',
        NumberOfFemaleLivestock: ''
      };
    });
    v$ = useVuelidate(rules1, form);
  }
  else if (!tabNumber && loanSurvey == 1) {
    const rules1 = computed(() => {
      return {
        planActivationTypeId: {required},
        LivestockTypeId: {required},
        Isinsurance:{required},
        numberOfJobsCreated: {required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        insuranceTypeId: '',
        workShopCode: '',
        numberOfInsurdPerson: '',
        NumberOfMaleLivestock: {required},
        NumberOfFemaleLivestock: ''
      };
    });
    form.insuranceTypeId = null
    form.workShopCode = null
    form.numberOfInsurdPerson = null
    v$ = useVuelidate(rules1, form);
  }
};

const LivestockTab = (tabNumber:number) => {
  animalsTab.value = tabNumber;
  if ([3, 4, 5, 7, 8, 9, 6].includes(tabNumber) && form.Isinsurance) {
    const rules1 = computed(() => {
      return {
        NumberOfMaleLivestock: {required},
        planActivationTypeId: {required},
        LivestockTypeId: {required},
        numberOfJobsCreated: {required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        Isinsurance:{required},
        insuranceTypeId: {required},
        workShopCode: {required},
        numberOfInsurdPerson: {required},
        NumberOfFemaleLivestock: '',
      };
    });
    form.NumberOfMaleLivestock = null
    v$ = useVuelidate(rules1, form);
  }
   else if ([3, 4, 5, 7, 8, 9, 6].includes(tabNumber)) {
    const rules1 = computed(() => {
      return {
        NumberOfMaleLivestock: {required},
        planActivationTypeId: {required},
        LivestockTypeId: {required},
        numberOfJobsCreated: {required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        Isinsurance:{required},
        insuranceTypeId: '',
        workShopCode: '',
        numberOfInsurdPerson: '',
        NumberOfFemaleLivestock: '',
      };
    });
    form.NumberOfMaleLivestock = null
    v$ = useVuelidate(rules1, form);
  } else if ([1, 2].includes(tabNumber)&& form.Isinsurance) {
    const rules1 = computed(() => {
      return {
        NumberOfFemaleLivestock: {required},
        planActivationTypeId: {required},
        NumberOfMaleLivestock: {required},
        LivestockTypeId: {required},
        numberOfJobsCreated: {required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        Isinsurance:{required},
        insuranceTypeId: {required},
        workShopCode: {required},
        numberOfInsurdPerson:{required},
      };
    });
    form.NumberOfFemaleLivestock = null
    form.NumberOfMaleLivestock = null
    v$ = useVuelidate(rules1, form);
  }else if ([1, 2].includes(tabNumber)) {
    const rules1 = computed(() => {
      return {
        NumberOfFemaleLivestock: {required},
        planActivationTypeId: {required},
        NumberOfMaleLivestock: {required},
        LivestockTypeId: {required},
        numberOfJobsCreated: {required},
        LivestockInsurance: {required},
        LivestockLicense: {required},
        LivestockBooklet: {required},
        Isinsurance:{required},
        insuranceTypeId: '',
        workShopCode: '',
        numberOfInsurdPerson: '',
      };
    });
    form.NumberOfFemaleLivestock = null
    form.NumberOfMaleLivestock = null
    v$ = useVuelidate(rules1, form);
  }
};

const Pachvalue = () => {
  previousValues=JSON.parse(<any>localStorage.getItem("SecPreForm"));
  if(previousValues){
    form.HasWorkPermission = previousValues.hasOwnProperty("HasWorkPermission") ? previousValues.HasWorkPermission : LasteSurvey ? LasteSurvey.hasWorkPermission : null
    form.insuranceTypeId = previousValues.hasOwnProperty("insuranceTypeId") ? previousValues.insuranceTypeId : LasteSurvey ? LasteSurvey.insuranceTypeId : null
    form.workShopCode = previousValues.hasOwnProperty("workShopCode") ? previousValues.workShopCode : LasteSurvey ? LasteSurvey.workShopCode : ""
    form.numberOfInsurdPerson = previousValues.hasOwnProperty("numberOfInsurdPerson") ? previousValues.numberOfInsurdPerson : LasteSurvey ? LasteSurvey.numberOfInsurdPerson : null
    form.numberOfJobsCreated = previousValues.hasOwnProperty("numberOfJobsCreated") ? previousValues.numberOfJobsCreated : LasteSurvey ? LasteSurvey.numberOfJobsCreated : ""
    form.OwnerTypeId = previousValues.hasOwnProperty("OwnerTypeId") ? previousValues.OwnerTypeId : LasteSurvey ? LasteSurvey.ownerTypeId : null
    form.planActivationTypeId = previousValues.hasOwnProperty("planActivationTypeId") ? previousValues.planActivationTypeId : LasteSurvey ? LasteSurvey.planActivationTypeId : null
    form.endOfActivationDate = previousValues.hasOwnProperty("endOfActivationDate") ? previousValues.endOfActivationDate : LasteSurvey ? LasteSurvey.endOfActivationDate : null
    form.Isinsurance = previousValues.hasOwnProperty("Isinsurance") ? previousValues.Isinsurance : LasteSurvey ? LasteSurvey.workShopCode == 0 ? 0 : 1 : null
    form.Id = previousValues.hasOwnProperty("Id") ? previousValues.Id : LasteSurvey ? LasteSurvey.Id : 0
    form.SurveyId = previousValues.hasOwnProperty("SurveyId") ? previousValues.SurveyId : LasteSurvey ? LasteSurvey.SurveyId : 0
    form.ProductTypeId = previousValues.hasOwnProperty("ProductTypeId") ? previousValues.ProductTypeId : LasteSurvey ? LasteSurvey.productTypeId : null
    form.LandArea = previousValues.hasOwnProperty("LandArea") ? previousValues.LandArea : LasteSurvey ? LasteSurvey.landArea : ""
    form.CultivatedLandArea = previousValues.hasOwnProperty("CultivatedLandArea") ? previousValues.CultivatedLandArea : LasteSurvey ? LasteSurvey.cultivatedLandArea : ""
    form.HasAgriculturalInsurance = previousValues.hasOwnProperty("HasAgriculturalInsurance") ? previousValues.HasAgriculturalInsurance : LasteSurvey ? LasteSurvey.hasAgriculturalInsurance : null
    form.EndOfAgriculturalInsurance = previousValues.hasOwnProperty("EndOfAgriculturalInsurance") ? previousValues.EndOfAgriculturalInsurance : LasteSurvey ? LasteSurvey.EndOfAgriculturalInsurance : null
    form.insuranceTabAgricultural = previousValues.hasOwnProperty("insuranceTabAgricultural") ? previousValues.insuranceTabAgricultural : LasteSurvey ? LasteSurvey.numberOfJobsCreated == 0 ? 0 : 1 : null
    form.NumberOfMaleLivestock = previousValues.hasOwnProperty("NumberOfMaleLivestock") ? previousValues.NumberOfMaleLivestock : LasteSurvey ? LasteSurvey.numberOfMaleLivestock : ""
    form.NumberOfFemaleLivestock = previousValues.hasOwnProperty("NumberOfFemaleLivestock") ? previousValues.NumberOfFemaleLivestock : LasteSurvey ? LasteSurvey.numberOfFemaleLivestock : ""
    form.LivestockTypeId = previousValues.hasOwnProperty("LivestockTypeId") ? previousValues.LivestockTypeId : LasteSurvey ? LasteSurvey.livestockTypeId : ""
    form.ID = previousValues.hasOwnProperty("ID") ? previousValues.ID : LasteSurvey ? LasteSurvey.ID : 0
    form.LivestockLicense = previousValues.hasOwnProperty("LivestockLicense") ? previousValues.LivestockLicense : LasteSurvey ? LasteSurvey.livestockLicense : null
    form.LivestockInsurance = previousValues.hasOwnProperty("LivestockInsurance") ? previousValues.LivestockInsurance : LasteSurvey ? LasteSurvey.livestockInsurance : null
    form.InsuranceDate = previousValues.hasOwnProperty("InsuranceDate") ? previousValues.InsuranceDate : LasteSurvey ? LasteSurvey.InsuranceDate : null
    form.NumberOfInsuredLivestock = previousValues.hasOwnProperty("NumberOfInsuredLivestock") ? previousValues.NumberOfInsuredLivestock : LasteSurvey ? LasteSurvey.hasWorkPermission : null
  }

}


const setCalenderLivestock = (tabNumber:any) => {
  calender.value = tabNumber;
};

const setCalenderForAgricultural = (tabNumber:any) => {
  AgriculturalCalender.value = tabNumber;
};


const ConvertNUM = (input) => {

  if (!input) {
    return "";
  }
  if (!/^[۰-۹0-9]+$/.test(input)) {
    ToastNotificationService.warn("از اعداد فارسی یا انگلیسی استفاده کنید ");;
     return ''
  }
  const persianToEnglishMap = {
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
  const convertedString = input.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
  return parseInt(convertedString, 10);
};




const NextstepHandel = () => {
  submitted.value = true
  if (!v$.value.$invalid) {
    if (form.numberOfInsurdPerson > form.numberOfJobsCreated) {
      ToastNotificationService.warn("تعداد بیمه شده نمیتواند بیشتر از اشغال ایجاد شده باشد");
    } else if (form.CultivatedLandArea > form.LandArea) {
      ToastNotificationService.warn(" میزان کشت نمیتواند از وسعت زمین بیشتر باشد");
    } else {
      store.SetFormTow(form)
      router.push({ path: "/survey/StepThree", query: {id:InfoMonitored.id ,loanType:loanSurvey }});
      localStorage.setItem("SecPreForm", JSON.stringify(form));
    }
  } else {
    ToastNotificationService.error("فیلد های اجباری را لطفا تکمیل کنید");
  }
};


onMounted(() => {
  Pachvalue()
  setCurrentTab(form.planActivationTypeId)
  setCalenderLivestock(form.LivestockInsurance)
  setCalenderForAgricultural(form.HasAgriculturalInsurance)
  InsuranceTabHadel(form.Isinsurance)
})

</script>

<style lang="scss">

</style>
