<template>
  <div class="position-relative z-1" style="height: 92vh">
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 100%; width: 100%"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      ></l-tile-layer>
      <l-marker
        :lat-lng="form.lat && form.lng ? [form.lat, form.lng] : markerLocation"
        :draggable="false"
        :icon="getMarkerIcon(customer.loanPlan.loanSurveyEconomidTypeId)"
      ></l-marker>
      <l--marker
        :lat-lng="[latitude, longitude]"
        :radius="10"
        color="blue"
      ></l--marker>
    </l-map>
    <div class="mt-3 position-absolute bottom-0 zindex col-12 " v-if="modal" >
      <div class="col col-11 bg-white px-2 ms-3 rounded-5 text-black">
        <div class="text-center col-12 pt-4 pb-3">
             <span class=" light d-flex  justify-content-between">
          <i class="bi bi-phone ms-3 font-icon-user mb-1 mx-2"></i>
              <p class="  mb-0 truncate-text  ">
                {{ customer.loanDetail.customerName }}
           <i class="bi bi-person  ms-3 font-icon-user mb-1 mx-2 "></i>
              </p>
             </span>
        </div>
        <div class="mb-1 col-12 px-2 text-end mb-3">
          <strong>
            ادرس طرح :
          </strong>
          {{ form.address }}
        </div>
        <div class="d-flex justify-content-between text-black text-end px-2 font-map ">
          <div class="bg-gray-1 cursor-pointer col-2 text-center py-3 justify-content-center ">
            <span @click="navigation" >

                 <img src="../../assets/images/turn-right.png" style="width:30px ; height: 30px;">

            </span>
            <p class="address-font">
              مسیریابی
            </p>

          </div>

          <P class="mb-0"> فاصله شما با طرح
            <span class="text-danger">
           {{ Math.round(distance) }}
            </span>
            کیلومتر
          </P>

        </div>
        <div class="d-grid col-12 mx-auto pt-3 pb-3">
          <button class="text-white bg-blue-1  p-3" type="button" @click="navigateToCardDetail(target,customerName.loanSurveyEconomidTypeId,customer.loanDetail.loanEconomicTypeId)">
            انجام نظارت
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
    <p v-if="Error" class="error  text-center pt-4">
      برای دسترسی به موقعیت جغرافیایی، لطفاً اجازه دسترسی به مکان را بدهید.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ToastNotificationService } from '~/core/toast-notification-service';


const router = useRouter();
const zoom = ref(12);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const Error = ref(false);
const selectedLocation = ref("");
let customerName = ref('');
let customer = ref('');
const target = router.currentRoute._value.query.id;

let latitude = ref(0);
let longitude = ref(0);
const data = localStorage.getItem('GetCartables');
const dataArray = JSON.parse(data);
const targetObject = dataArray.find(item => item.id === Number(target));
if (targetObject) {
  customerName = targetObject.loanPlan;
  customer = targetObject;
}
const form = ref({
  address: customerName.address,
  Namevilleg: customerName.address,
  lat: customerName.latitude,
  lng: customerName.longitude,
});


const markerLocation = ref([  form.value.lat, form.value.lng]);
const center = ref([form.value.lat, form.value.lng]);
const error = ref(false)
const modal =ref(true)
definePageMeta({
  layout: "map",
});

const navigateToCardDetail = (id: string,loanType:any,) => {
  router.push({ path: "/survey/Stepone", query: {id, loanType: loanType } });
  // router.push({ path: "/MonitoringRegistrationPage", query: {id, loanType: loanType } });
};


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};
const distance = ref(0);
const updateMarkerLocation = (event: { latlng: { lat: number; lng: number } }) => {
  const [userLat, userLng] = [latitude, longitude];
  const markerLat = markerLocation.value[0];
  const markerLng = markerLocation.value[1];
  distance.value = calculateDistance(userLat.value, userLng.value, markerLat, markerLng);
};

const   getMarkerIcon = (item) => {
  const typeId = item;

  if (typeof typeId === 'number' && typeId >= 1 && typeId <= 4) {
    let iconPath = '';
    if (typeId === 1) {
      iconPath = '../../img/A.png';
    } else if (typeId === 2) {
      iconPath = '../../img/D.png';
    } else if (typeId === 3) {
      iconPath = '../../img/C.png';
    } else if (typeId === 4) {
      iconPath = '../../img/C.png';
    }
    return L.icon({
      iconUrl: iconPath,
      iconSize: [50, 50],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }
  return null;
};


const  navigation=()=>{
  const destinationLocation = { latitude, longitude };
  const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${form.value.lat},${form.value.lng}`;
  window.open(mapsLink, '_blank');
}

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        updateMarkerLocation({
          latlng: { lat: latitude.value, lng: longitude.value },
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          Error.value=true
          modal.value=false
        }else {
          ToastNotificationService.error("خطای ناشناخته در درخواست موقعیت جغرافیایی.",500000);
        }
      }
    );
  } else {
    ToastNotificationService.error("مرورگر شما از ویژگی موقعیت جغرافیایی پشتیبانی نمی‌کند.",500000);
  }
})


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
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 0.5s forwards;
  background-color: #fca40f;
  color: white;
}

</style>
