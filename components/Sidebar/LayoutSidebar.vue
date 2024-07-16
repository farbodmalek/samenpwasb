<template>
  <div id="sidebar" :class="{ active: isSidebarActive }">
    <div ref="sidebarWrapper" class="sidebar-wrapper active">
      <div class="sidebar-header bg-blue-1" style="height: 175px">
        <div class="d-flex text-center justify-content-center">
          <div>
            <h1 class="text-cnter text-white mt-4">{{ supervisoryInfo.fullUserName }}</h1>
          </div>
          <div class="sidebar-toggler x">
            <a
              class="sidebar-hide d-xl-none d-block"
              href="#"
              @click="store.toggleSidebar"
            >
              <i class="bi bi-x bi-middle"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul class="menu">
          <div  v-for="item in store.sidebarItems">
            <sidebar-item  :item="item" @click="logout(item.id)"></sidebar-item>
          </div>
        </ul>
      </div>
      <button class="sidebar-toggler btn x" @click="store.toggleSidebar">
        <i data-feather="x"></i>
      </button>
    </div>

    <div v-if="closeExitemodale" class="modal-backdrop">
      <div class="modal-home col-10">
        <p class="text-center"> کاربر گرامی شما دارای نظارت افلاین هستید.نظارت های افلاین شما تا ساعت 12شب ذخیره میماند.
          در صورت دسترسی به اینترنت در در اسرع وقت  به سمت سرور ارسال کنید </p>
        <div class="col-12 d-flex justify-content-center">
          <div class="col-12 d-flex justify-content-center gap-2">

            <button class="bg-blue-1 rounded-2 p-3 col-5 text-white bg-blue-1 py-1 address-font" type="button"
                    @click="modalexite">
              رفتن به لیست وام ها
            </button>
            <button class="bg-blue-1 rounded-2 p-3 col-5 text-white bg-blue-1 py-1 address-font" type="button"
                    @click="modalHome">
              خروج از برنامه
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script lang="ts" setup>
import PerfectScrollbar from "perfect-scrollbar";
import SidebarItem from "./SidebarItem.vue";
import {useStore} from "~/store";
import {computed, onMounted, ref, watch} from "vue";

const closeExitemodale = ref(false)

const SupervisoryInfo = localStorage.getItem("SupervisoryInfo")
const supervisoryInfo = SupervisoryInfo ? JSON.parse(SupervisoryInfo) : {}
const router = useRouter();
const store = useStore();
const isSidebarActive = computed(() => store.isSidebarActive);
const sidebarWrapper = ref<HTMLElement>();
const onresize = () => {
  // Hide sidebar if screen size is below 1200
  const screenWidth = window.innerWidth;
  if (screenWidth < 1200) {
    store.closeSidebar();
    return;
  }
  store.openSidebar();
};
/**
 * Create Sidebar Backdrop
 */
const createBackdrop = () => {
  if (window.innerWidth > 1200) return;
  deleteBackdrop();
  const backdrop = document.createElement("div");
  backdrop.classList.add("sidebar-backdrop");
  backdrop.addEventListener("click", () => {
    store.closeSidebar();
    deleteBackdrop();
  });
  document.body.appendChild(backdrop);
};
/**
 * Delete Sidebar Backdrop
 */
const deleteBackdrop = () => {
  const backdrop = document.querySelector(".sidebar-backdrop");
  if (backdrop) {
    backdrop.remove();
  }
};

onMounted(() => {
  onresize();
  window.addEventListener("resize", onresize);
  // Perfect Scrollbar Init
  new PerfectScrollbar(sidebarWrapper.value!, {
    wheelPropagation: false,
  });
});

watch(
  () => store.isSidebarActive,
  (isSidebarActive) => {

    if (isSidebarActive) {
      createBackdrop();
    } else {
      deleteBackdrop();
    }

    // Disable scrolling when sidebar is open
    const body = document.querySelector("body");
    if (body && window.innerWidth >= 1200) {
      body.style.overflowY = "auto";
    } else if (body) {
    }
  }
);

const logout = (index) => {
  if (index == 2) {
    let userId = ""
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("user")) {
        userId = key.substring(5, 11)
      }
    }


    if (userId) {
      closeExitemodale.value = true
    } else {
      localStorage.removeItem("SurveyBaseInfo");
      localStorage.removeItem("SupervisoryInfo");
      localStorage.removeItem("SurveysList")
      localStorage.removeItem("nuxt-color-mode");
      localStorage.removeItem("Cartables");
      router.push("/login");
    }

  }
};
const modalexite = () => {
  closeExitemodale.value = false
}

const modalHome = () => {
  router.push("authorization/login");
  localStorage.removeItem("supervisoryInfo");
  localStorage.removeItem("localStorageUserKey");
  localStorage.removeItem("SurveyBaseInfo");
  localStorage.removeItem("nuxt-color-mode");
  localStorage.removeItem("data");
}
</script>


<style lang="scss" scoped>
[class^="bi-"]::before,
[class*=" bi-"]::before {
  vertical-align: text-top;
  color: #ffffff;
}

.modal-exite {
  position: absolute;
  top: 50%;
  margin-left: 18px;
  transform: translate(10px, 10px);
  z-index: 10000;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
