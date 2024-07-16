<template>
  <div class="page-heading">
    <div class="page-title position-sticky top-0 z-20 bg-gray-1 mb-2 ">
      <div class="">
        <div  class="form-group justify-content-center  d-flex pb-2 pt-2" role="search">
          <input-text
              v-model="searchUser"
              class=" col-9  mx-5 p-2 text-center rounded-pill border-secondary text-black data"
              placeholder="جستوجو بر اساس نام یا شماره قرداد "
              type="search"
          />
        </div>
      </div>
    </div>

    <section  class="mx-3 d-flex flex-column gap-3">
      <div v-for="(item, index) in Data" :key="index" class="col-md-6  col-sm-12 d-flex flex-column">
        <div :class="getItemClass(item.loanPlan.id)"
             class="shadow-lg bg-white border-top"
             @click="navigateToCardDetail(item.id,item.loanPlan.id,item.loanDetail.loanEconomicTypeId)">
          <div class="p-3">
            <div class="d-flex justify-content-between text-black ">
              <img v-if="item.loanPlan.id===0" src="/img/contact.png" width="50" alt="photo">
              <img v-if="item.loanPlan.id" class=" px-2" src="/img/icons8-location-96.png" width="70" alt="photo">
              <span class=" light d-flex">
                  <p class=" mt-3  truncate-text">{{ item.loanDetail.customerName }}</p>
                    <img v-if="item.customerGenderType" class="mb-1 mx-2 " src="/img/muslim.png" width="50" alt="photo">
                    <img v-else class="mb-1 mx-2" src="~/assets/images/man.png" width="50" alt="photo">
              </span>
            </div>
          </div>
          <p class="card-text text-center text-black title-font px-3 py-2">
            {{ item.loanDetail.loanMinorTypeDesc }}
          </p>
          <div class="background d-flex card-text text-center text-danger bg-gray justify-content-center p-1">
            <span class="">{{ item.loanDetail.loanNumber }}</span>
            <p class="card-text text-center text-danger bg-gray fw-bold px-1 ">
              :شماره قرارداد
            </p>
          </div>
          <div class="d-flex justify-content-between pt-3 px-3">
            <p :class="{'text-danger':convert(item.loanPlan.loanSurveyEconomidTypeId) === ':ثبت نشده' }"
               class="text-success  date-font ">
              <strong>نوع نظارت </strong>
              {{ convert(item.loanPlan.loanSurveyEconomidTypeId) }}</p>
            <p class="text-black date-font">
              مهلت پرداخت
              <strong class="data"> {{ item.expireDateFa }}</strong>
            </p>
          </div>
        </div>

        <div v-for="(item1 ,i) in showsend " :key="i" class='d-flex  position-relative'>
          <div v-if="index===item1" class="d-flex col-12 col-12 bg-orange-1">
            <button
                class="bg-white btn btn-light  col-4 d-flex p-2 date-font gap-2 py-4 cursor-pointer justify-content-center  "
                @click="SetSurvey(item)">
              ارسال به سرور
              <i class="bi bi-cloud-arrow-up"></i>
            </button>
            <p class=" text-center pt-2  pt-4 date-font data ">
              نظارت انجام شده را حتما پس از برقراری اینترنت ارسال نمایید
            </p>
            <p v-if="getInfo" class="col-12 bg-orange-1 text-center pt-2  pt-4 position-absolute" style="height: 100%">
              درحال دریافت اطلاعات لطفا صبر کنید
            </p>
            <p v-if="sendphoto" class="col-12 bg-orange-1 text-center pt-2  pt-4 position-absolute" style="height: 100%">
              درحال ارسال عکس لطفا صبر کنید
            </p>
          </div>
        </div>

      </div>
    </section>
  </div>

  <Dialog
      v-model:visible="visible"
      class="col-8"
      modal
      showHeader="false">
    <p class="text-center pt-3">نظارت شما با موفقیت ثبت شد </p>
    <nuxt-link class="col-12" to="/">
      <button class="text-white bg-blue-1 rounded-5 font1 col-12 text-white bg-success py-3 " type="button"
              @click="closeDialog">
        تایید
      </button>
    </nuxt-link>
  </Dialog>

  <Dialog
      v-model:visible="isModalVisible"
      :showHeader="true"
      header="نوع نظارت را مشخص فرمایید"
      modal>
    <div class="d-flex flex-column p-2 justify-content-center align-items-center  ">
      <div class="col-12 text-center border border-secondary p-3" @click="routerhusbandry(1)">
        <span>دامپروری</span>
      </div>
      <div class="col-12 text-center border border-secondary p-3" @click="routergarden(2)">
        <span>زراعی/باغی</span>
      </div>
      <div class="col-12 text-center border border-secondary p-3" @click="routerservice(3)">
        <span>خدمات</span>
      </div>
    </div>
  </Dialog>

  <div v-if="condition" class="d-flex justify-content-centerd  flex-column-reverse">
    <p class="text-center">هیچ نظارتی برای شما ثبت نشده</p>
  </div>
</template>

<script lang="ts" setup>
import {UseLoading} from "../store/loading-store";
import {makeResponse} from "~/core/make-response"
import {MakeOfflineServiese} from "~/core/Make-offline-serviese"
import {ToastNotificationService} from "~/core/toast-notification-service";
import {CommonServices} from "~/core/base/common-services";
import {MakeResponse} from "~/composables/make-response";


const Data = ref();
const searchUser = ref('');
const router = useRouter();
const condition = ref(false)
const sendphoto = ref(false)
const getInfo = ref(false)
const showsend = ref([]);
const visible = ref(false)
let globalCardName = 0;
const isModalVisible = ref(false);
const currentDate = new Date();
const todayDateString = currentDate.toISOString().split('T')[0]

watch(searchUser, (newVal: any,) => {
  const data = JSON.parse(<any>localStorage.getItem("Cartables"));
  if (newVal) {
    const foundData = data.filter((item: any) => {
      return (
          item.loanDetail.customerName.toString().includes(newVal) ||
          item.loanDetail.loanNumber.toString().includes(newVal)
      );
    });
    Data.value = foundData;
    if (foundData.length === 0) {
      ToastNotificationService.error("!کاربر مورد نظر یافت نشد");
    }
  } else {
    Data.value = data;
  }
});



const getItemClass = (item: number) => {
  return {
    'background-card': item == 0
  };
};

const closeDialog = () => {
  location.reload()
  visible.value = false
}

const showModal = () => {
  isModalVisible.value = true;
};

const navigateToCardDetail = (id: number, loanPlanId: number, loanType: number) => {
  if (loanPlanId == 0 && loanType == 1) {
    showModal();
    globalCardName = id;
  } else if (loanPlanId == 0) {
    const updatedLoanEconomicTypeId = loanType === 4 ? 3 : loanType === 3 ? 4 : loanType;
    router.push({path: "/survey/Stepone", query: {id, loanType: updatedLoanEconomicTypeId}});
  } else {
    router.push({path: "/navigtion/MapPage", query: {id, loanType}});
  }
};

const routergarden = (loanType: number) => {
  router.push({path: "/survey/Stepone", query: {id: globalCardName, loanType}});
}

const routerhusbandry = (loanType: number) => {
  router.push({path: "/survey/Stepone", query: {id: globalCardName, loanType}});
}

const routerservice = (loanType: number) => {
  router.push({path: "/survey/Stepone", query: {id: globalCardName, loanType}});
}

const convert = (number: any) => {
  switch (number) {
    case 0:
      return ":ثبت نشده";
    case 1  :
      return ":دامپروری"
    case 2:
      return ":زراعی";
    case 3:
      return ":خدمات";
    case 4:
      return ":صنعتی";
  }
}


const ClearStorge = () => {
  makeResponse.Clearlocalform()
};

const FindOfflineForm = () => {
  makeResponse.FindOfflineForm((result: any) => {
    showsend.value.push(result);
  })
};

const GetCartables = () => {
  MakeResponse.makeServerResponse(CommonServices.GetCartables(), true, result => {
    if ( result && result.results && result.results.length>0) {
      const Cartables = result.results.filter((item: any) => item.expireDate.substring(0, 10) >= todayDateString);
      localStorage.setItem('Cartables', JSON.stringify(Cartables));
      if(Cartables.length>0){
        Data.value = Cartables
      }else{
        condition.value = true
      }
    }
    else if (result === "ERR_NETWORK") {
      const GetCartable = JSON.parse(<any>localStorage.getItem('Cartables'));
      Data.value = GetCartable
    }
  });
}

const GetSurveysList = () => {
  MakeResponse.makeServerResponse(CommonServices.GetSurveys(), true, result => {
    if ( result && result.results) {
      localStorage.setItem('SurveysList', JSON.stringify(result.results));
    }
  });
};

const SetSurvey = async (data: any) => {
  await MakeOfflineServiese.SetSurveyImage(data, (result: { getinfo: any; sendphoto: any; }) => {
    getInfo.value = result.getinfo;
    sendphoto.value = result.sendphoto;
  });
  await MakeOfflineServiese.SetLoanPlanSurvey((result: { getinfo: any; sendphoto: any; iSSend: any; }) => {
    getInfo.value = result.getinfo;
    sendphoto.value = result.sendphoto;
    visible.value = result.iSSend
    setTimeout(()=>{ location.reload()},5000)
  });
};

const openDataDB = () => {
  MakeOfflineServiese.openDatabase()
}

onMounted(() => {
  GetCartables()
  FindOfflineForm()
  GetSurveysList()
  openDataDB()
  ClearStorge()
});

</script>
<style lang="scss">

</style>
