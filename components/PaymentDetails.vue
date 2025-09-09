<template>
  <div>
    <img
      v-if="loanType==3"
      alt=""
      class="d-block card-img img-fluid"
      src="/img/service.jpg"
    />
    <img
      v-if="loanType==4"
      alt=""
      class="d-block card-img img-fluid"
      src="/img/industrial.jpg"
    /> <img
    v-if="loanType==2"
    alt=""
    class="d-block card-img img-fluid"
    src="/img/gardening.jpg"
  /> <img
    v-if="loanType==1"
    alt=""
    class="d-block card-img img-fluid"
    src="/img/agriculture.jpg"
  />
    <!-- card details header -->
      <div class="d-flex overflow-hidden border-black" style="width: 100%">
        <div class="rounded-bottom  m-1 bg-white w-25">
            <div class="text-center text-black font-0-7 text-center py-3 px-1 ">
              <span
                class="d-block text-center pb-2 numfont ">{{ formatNumberWithCommas(Cartables.numberOfDelayedInstallment) }}</span>
              <strong class="font1 fw-bold  ">تعداد اقساط پرداخت نشده </strong>
            </div>
        </div>
        <div class="rounded-bottom  m-1 bg-white w-25">
            <div class="text-center text-black font-0-7 py-3 px-1 ">
              <span
                class="d-block text-center pb-2 numfont ">{{ formatNumberWithCommas(Cartables.totalDelayedAmount) }}</span>
              <strong class="font1 fw-bold">کل معوقات</strong>
            </div>
        </div>

        <div class="rounded-bottom  m-1 bg-white w-25">
            <div class="text-center text-black font-0-7 py-3 px-1 ">
              <span class="d-block text-center pb-2 numfont ">{{
                  formatNumberWithCommas(Cartables.eachInstallmentAmount)
                }}</span>
              <strong class="font1 fw-bold">مبلغ هر قسط</strong>
            </div>
        </div>

        <div class="rounded-bottom  m-1 bg-white  w-25">
            <div class="text-center text-black font-0-7 py-3 px-1 ">
              <span class="d-block text-center pb-2 numfont ">{{
                  formatNumberWithCommas(Cartables.loanAmount)
                }}</span>
              <strong class="font1 fw-bold">مبلغ تسهیلات</strong>
            </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
import {useSurveyStore} from "~/store/useSurveyStore";

const route = useRouter()
const surveyStore = useSurveyStore();
const loanId = route.currentRoute._value.query.loanId;
const Cartables = surveyStore.getCartableUserDataById(Number(loanId));
const loanType = route.currentRoute._value.query.loanType;

const formatNumberWithCommas = (value:any) => {
  if (value === null || value === undefined) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
</script>
<style lang="scss">


@media screen and (max-width: 395px) {
  .numfont {
    font-size: 13px;
    text-align: start;
  }
}

</style>
