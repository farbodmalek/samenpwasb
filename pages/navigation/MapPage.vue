<template>
  <div class="position-relative z-1" style="height: 92vh">
    <l-map :zoom="zoom" :center="center" style="height: 100%; width: 100%">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          :attribution="attribution"
      ></l-tile-layer>
      <l-marker
          :lat-lng="[form.lat, form.lng]"
          :draggable="false"
          :icon="getMarkerIcon(surveyData.loanPlan.loanSurveyEconomidTypeId)"
      ></l-marker>
      <l-circle-marker
          :lat-lng="[latitude, longitude]"
          :radius="10"
          color="blue"
      ></l-circle-marker>
    </l-map>

    <div class="mt-3 position-absolute bottom-0 zindex col-12" v-if="modal">
      <div class="col-11 bg-white px-2 ms-3 rounded-5 text-black">
        <div class="text-center col-12 pt-4 pb-3">
            <p class="mb-0 truncate-text fw-bold font-1 ">{{ surveyData.loanDetail.customerName }}</p>
        </div>
        <div class="mb-1 col-12 px-2 text-start mb-3">
          <strong>آدرس طرح :</strong> {{ surveyData.loanPlan.address }}
        </div>
        <div class="d-flex justify-content-between text-black text-end px-2 font-map">
          <div class="bg-gray-1 cursor-pointer col-2 text-center py-3" @click="navigation">
            <img src="../../assets/images/turn-right.png" style="width:30px; height:30px;">
            <p class="address-font">مسیریابی</p>
          </div>
          <p class="mb-0">
            فاصله شما با طرح <span class="text-danger">{{ Math.round(distance) }}</span> کیلومتر
          </p>
        </div>
        <div class="d-grid col-12 mx-auto pt-3 pb-3">
          <button class="text-white bg-blue-1 p-3" @click="navigateToCardDetail">
            انجام نظارت
          </button>
        </div>
      </div>
    </div>

    <div v-if="Error" class="col-12 text-center pt-4 error">
      برای دسترسی به موقعیت جغرافیایی، لطفاً اجازه دسترسی به مکان را بدهید.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToastNotificationService } from '~/core/toast-notification-service';
import { useSurveyStore } from "~/store/useSurveyStore";

definePageMeta({ layout: "map" });

const router = useRouter();
const route = useRoute();
const zoom = ref(12);
const attribution = '&copy; OpenStreetMap contributors';
const Error = ref(false);
const surveyStore = useSurveyStore();
const latitude = ref(0);
const longitude = ref(0);
const surveyData = surveyStore.getCartableUserDataById(Number(route.query.id));

const form = ref({
  address: surveyData?.customerName?.address || '',
  lat: surveyData?.customerName?.latitude || 0,
  lng: surveyData?.customerName?.longitude || 0,
});

const center = ref([form.value.lat, form.value.lng]);
const modal = ref(true);
const distance = ref(0);

const navigateToCardDetail = () => {
  router.push({
    path: "/survey/Stepone",
    query: { id: route.query.id, loanType: surveyData.loanDetail.loanEconomicTypeId }
  });
};

const calculateDistance = (lat1:number, lon1:number, lat2:number, lon2:number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getMarkerIcon = (typeId:number) => {
  const iconPaths = {
    1: '../../img/A.png',
    2: '../../img/D.png',
    3: '../../img/C.png',
    4: '../../img/C.png',
  };
  const iconUrl = iconPaths[typeId] || '';
  return L.icon({
    iconUrl,
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const navigation = () => {
  const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${form.value.lat},${form.value.lng}`;
  window.open(mapsLink, '_blank');
};

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
          distance.value = calculateDistance(latitude.value, longitude.value, form.value.lat, form.value.lng);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            ToastNotificationService.error("برای دسترسی به موقعیت جغرافیایی، لطفاً اجازه دسترسی به مکان را بدهید.", 5000);
            modal.value = false;
          } else {
            ToastNotificationService.error("خطای ناشناخته در درخواست موقعیت جغرافیایی.", 5000);
          }
        }
    );
  } else {
    ToastNotificationService.error("مرورگر شما از ویژگی موقعیت جغرافیایی پشتیبانی نمی‌کند.", 5000);
  }
});
</script>

<style>
.zindex {
  z-index: 999;
}

.error {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  background-color: #fca40f;
  color: white;
  z-index: 999;
  animation: moveUp 0.5s forwards;
}
</style>
