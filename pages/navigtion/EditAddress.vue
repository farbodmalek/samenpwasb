<template>
  <form @submit.prevent="sumbit()">
    <div  class="position-relative z-1">
      <l-map
          :center="center"
          :zoom="16"
          class="col-12 vh-100">
        <l-tile-layer
            :attribution="attribution"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
        </l-tile-layer>
        <l-marker
            :draggable="false "
            :lat-lng=" markerLocation"

        ></l-marker>
        <l-circle
            :lat-lng="circleLocation"
        ></l-circle>
      </l-map>
      <div v-if="EditBox" class="mt-3 position-absolute top-0 z-4 col-12">
        <div class="col col-11 bg-white px-2 ms-3 rounded-5 text-black">
          <div class="text-center col-12 pt-4 pb-3">
            <span class="px-2">افزودن ادرس محل طرح</span>
          </div>
          <div class="mb-1 form-group col-12 px-2">
            <input-text
                v-model="form.villageName"
                class="col-12 text-end mb-3  text-black border-black"
                placeholder=" نام روستا  (اگر محل طرح روستا باشد )"
                style="height: 50px"/>
            <input-text
                id="exampleInputPassword1"
                v-model="form.address"
                class="col-12 text-end pt-0 bg-light border-black text-black"
                placeholder="ادرس طرح"
                style="height: 65px"
            />
          </div>
          <div class="d-grid col-12 mx-auto pt-3 pb-2">
            <button class="text-white bg-blue-1 rounded-pill p-4">
              ثبت
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
          <p v-if="Error" class="error  text-center pt-4">
            برای دسترسی به موقعیت جغرافیایی، لطفاً اجازه دسترسی به مکان را بدهید.
          </p>

        </div>
      </div>
    </div>
  </form>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ToastNotificationService } from '~/core/toast-notification-service';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { Useform } from '~/store/Form';

definePageMeta({
  layout: 'survey',
});

const store = Useform();
const router = useRouter();
const route = useRoute();
const center = ref([30, 50]);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">صندوق کار افرینی امید </a>';
const markerLocation = ref([35.70001302853155, 51.38855516910554]);
const circleLocation = ref([35.70001302853155, 51.38855516910554]);
const error = ref(false);
const EditBox = ref(true);
const Error = ref(false);
const loanSurveyEconomidTypeId = route.query.loanType;

let InfoMonitored = <any>ref('');
const GetCartable = JSON.parse(<any>localStorage.getItem('GetCartables'));
const targetObject = GetCartable.find((item: any) => item.id === Number(route.query.id));
if (targetObject) {
  InfoMonitored = targetObject;
}

const form = reactive({
  latitude: null,
  longitude: null,
  address: null,
  villageName: null,
});

const rules = computed(() => ({
  latitude: { required },
  longitude: { required },
  address: { required },
  villageName:'',
}));

const v$ = useVuelidate(rules, form);

const MapRouteHandle = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          form.latitude = position.coords.latitude;
          form.longitude = position.coords.longitude;
          center.value = [position.coords.latitude, position.coords.longitude];
          markerLocation.value = [position.coords.latitude, position.coords.longitude];
          updateLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            Error.value = true;
            EditBox.value = false;
          }
        }
    );
  }
};

const updateLocation = (lat: number, lng: number) => {
  form.longitude = lng;
  form.latitude = lat;
  center.value = [lat, lng];
  markerLocation.value = [lat, lng];
  circleLocation.value = [lat, lng];
};

const sumbit = () => {
  if (!v$.value.$invalid) {
    store.getAddress(form);
    router.push({
      path: '/survey/Stepone',
      query: { id: InfoMonitored.id, loanType: loanSurveyEconomidTypeId },
    });

  }
  else {
    if (form.latitude===null && form.latitude ===null){
      ToastNotificationService.error('خطا در دریافت موقعیت لطفا مجددا تلاش کنید ');
    } else {
      ToastNotificationService.error('ادرس  لطفا تکمیل کنید');

    }}
};

onMounted(() => {
  MapRouteHandle();
});
</script>

<style lang="scss">
</style>
