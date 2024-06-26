
<template>
  <div class="position-relative z-1" style="height: 94vh">
    <l-map :zoom="zoom" :center="center" style="height: 100%; width: 100%">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      ></l-tile-layer>
      <l-marker
        v-for="(item, index) in filteredItems"
        :key="index"
        :lat-lng="[item.loanPlan.latitude, item.loanPlan.longitude]"
        :draggable="false"
        @click="showMarkerInfo(index)"
        :icon="getMarkerIcon(item)"
      ></l-marker>
      <l--marker
          :lat-lng="[latitude, longitude]"
          :radius="10"
          color="blue"
      ></l--marker>
    </l-map>
  </div>
  <div class="mt-3 position-absolute bottom-0 zindex col-12 " v-if="modal">
    <div class="col col-11 bg-white px-2 ms-3 rounded-5 text-black">
      <div class="text-center col-12 pt-4 pb-3">
             <span class=" light d-flex  justify-content-between">
          <i class="bi bi-phone ms-3 font-icon-user mb-1 mx-2"></i>
              <p class="  mb-0 truncate-text  ">
{{selectedData.loanDetail.customerName}}
           <i class="bi bi-person  ms-3 font-icon-user mb-1 mx-2 "></i>
              </p>
             </span>
      </div>

      <div class="mb-1 col-12 px-2 text-end mb-3">
        <strong>
          ادرس طرح :
          {{selectedData.loanPlan.address}}
        </strong>

      </div>
      <div class="d-flex justify-content-end text-black text-end px-2 font-map ">
        <P class="mb-0"> فاصله شما با طرح
          <span class="text-danger">
          {{formatNumberWithCommas(Math.round(distance*1000))}}
            </span>
          متر است
        </P>
      </div>
      <div class="d-grid col-12 mx-auto pt-3 pb-3">
          <button class="text-white bg-blue-1  p-3" type="button" @click="navigateToCardDetail(selectedData.id,selectedData.loanPlan.loanSurveyEconomidTypeId,selectedData.loanDetail.loanEconomicTypeId)">
          انجام نظارت
        </button>
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




const router = useRouter();

const defaultMapZoom = 10;


const zoom = ref();
const Data = ref(JSON.parse(localStorage.getItem("GetCartables")));
zoom.value = defaultMapZoom;
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const markerLocation = ref([35.70001302853155, 51.38855516910554]);
const selectedLocation = ref("");
let customerName = ref('');
let customer = ref('');
const modal =ref(false)
const data = localStorage.getItem('GetCartables');
const dataArray = JSON.parse(data);
const selectedData =ref();
let latitude = ref(0);
let longitude = ref(0);
const Error = ref(false);
const filteredData =dataArray.filter(item => item.cartableStatusTypeId === 1 );
const currentDate = new Date();
const todayDateString = currentDate.toISOString().split('T')[0]
const filteredExpireDate = filteredData.filter(item => item.expireDate.substring(0,10) >= todayDateString);
const filteredItems = filteredExpireDate.filter(item => {
  const statusTypeId = item.loanPlan.loanSurveyEconomidTypeId;
  return typeof statusTypeId === 'number' && statusTypeId >= 1 && statusTypeId <= 4;
});


if (filteredItems) {
    customerName = filteredItems.loanPlan;
    customer = filteredItems;
}
const center = ref([filteredItems[0].loanPlan.latitude,filteredItems[0].loanPlan.longitude]);


const showMarkerInfo = (index: number) => {

  selectedData.value = filteredItems[index];



  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        modal.value=true
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        updateMarkerLocation({
          latlng: { lat: latitude.value, lng: longitude.value },
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          modal.value=false
          Error.value=true
          setTimeout(()=>{
            Error.value=false
          },3500)
        } else {
          alert("خطای ناشناخته در درخواست موقعیت جغرافیایی.");
        }
      }
    );
  } else {
    alert("مرورگر شما از ویژگی موقعیت جغرافیایی پشتیبانی نمی‌کند.");
  }

  const updateMarkerLocation = (event: { latlng: { lat: number; lng: number } }) => {
    const [userLat, userLng] = [latitude, longitude];
    const markerLat = filteredItems[index].loanPlan.latitude;
    const markerLng = filteredItems[index].loanPlan.longitude;
    distance.value = calculateDistance(userLat.value, userLng.value, markerLat, markerLng);
  };

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
  const distance = R * c;
  return distance;
};
const distance = ref(0);





const navigateToCardDetail = (id: string,loanType:any,) => {
  router.push({ path: "/survey/Stepone", query: {id, loanType: loanType } });
};



definePageMeta({
  layout: "map",
});



const getMarkerIcon = (item) => {
  const typeId = item.loanPlan.loanSurveyEconomidTypeId;

  if (typeof typeId === 'number' && typeId >= 1 && typeId <= 4) {
    let iconPath = '';
    if (typeId === 1) {
      iconPath = '../../img/A.png';
    } else if (typeId === 2) {
      iconPath = '../../img/D.png';
    } else if (typeId === 3) {
      iconPath = '../../img/C.png';
    } else if (typeId === 4) {
      iconPath = '../../img/B.png';
    }
    return L.icon({
      iconUrl: iconPath,
      iconSize: [40, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }

  return null;
};

const formatNumberWithCommas = (value) => {
  if (value === null || value === undefined) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};



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


