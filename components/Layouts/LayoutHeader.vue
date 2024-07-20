<template>
  <header class="bg-blue-1" style="height: 50px">
    <div class="d-flex justify-content-between pt-1 px-2">
      <div class="px-1 py-2 col-4 px-2">
        <span class="px-2">
          <a @click="mapPage">
            <img
              src="../../assets/images/icons8-map-50 (1).png"
              style="width: 20px; height: 20px"
            />
            {{ route.meta.headerNumber }}
          </a>
        </span>
        <span>
          <img
            src="../../assets/images/icons8-reboot-50.png"
            style="width: 20px; height: 20px"
            @click="RefreshPage"
          />
        </span>
      </div>
      <div class="d-flex">
        <div
          v-if="isOffline"
          class="offline-message text-white px-2 py-2 text-white"
        >
          <p>(افلاین )</p>
        </div>
        <span class="px-2 py-2 text-white">لیست وام ها</span>

        <a
          href="#"
          class="burger-btn d-block d-xl-none text-white px-2 py-2"
          @click="toggleSidebar"
        >
          <img
            src="../../assets/images/icons8-menu-50.png"
            style="width: 20px; height: 20px"
          />
        </a>
      </div>
    </div>
  </header>
  <div
    v-if="mapError"
    class="errormappage text-center pt-2 pt-4 text-right"
    dir="rtl"
  >
    <p>برای پرونده ها ادرسی ثبت نشده</p>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "~/store";

let { toggleSidebar } = useStore();
const route = useRoute();
const router = useRouter();
const isOffline = ref(!navigator.onLine);
const mapError = ref(false);
const RefreshPage = () => {
  location.reload();
};

const mapPage = () => {
  const items = localStorage.getItem("Cartables");
  const data = JSON.parse(items);
  const filteredData = data.filter((item) => item.cartableStatusTypeId == 1);
  const currentDate = new Date();
  const todayDateString = currentDate.toISOString().split("T")[0];
  const filteredExpireDate = filteredData.filter(
    (item) => item.expireDate.substring(0, 10) >= todayDateString
  );
  const filtere = filteredExpireDate.filter(
    (item) => item.loanPlan.loanSurveyEconomidTypeId !== 0
  );
  if (filtere.length == 0) {
    mapError.value = true;
    setTimeout(() => {
      mapError.value = false;
    }, 2500);
  } else {
    router.push("navigtion/Map");
  }
};

window.addEventListener("online", () => {
  isOffline.value = false;
});

window.addEventListener("offline", () => {
  isOffline.value = true;
});

if (navigator.onLine) {
  isOffline.value = false;
} else {
  isOffline.value = true;
}
</script>

<style>
.errormappage {
  position: fixed;
  bottom: 0;
  padding: 2px;
  width: 100%;
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 1s forwards;
  background-color: #fca40f;
  color: white;
}
</style>
