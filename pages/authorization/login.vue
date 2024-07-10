<template>

  <div class=" justify-content-center container ">
    <Download/>
    <form @submit.prevent="login">
      <div ref="pageContainer" class="mt-5">
        <div v-if="isMobile"
             style="position: absolute; bottom: 0"
             @focusin="onFocusIn"
             @focusout="onFocusOut"></div>

        <div class="card-body pt-5 text-center mb-5">
          <div class="text-primary pb-3">
            <img alt="" src="../../assets/images/logo%20log%20in.png" style="height: 250px;width: 150px"/>
          </div>
        </div>
        <div class="container mt-5">
          <div class="mt-5">
                <div class="form-group mb-3 col-12 px-2">
                    <input-text
                      v-model="form.username"
                      class="text-center w-100"
                      placeholder="نام کاربری  "
                      type="text"
                      :class="{'p-invalid': v$.username.$invalid && submitted}"
                    />
                </div>
                  <div class="form-group p-icon-field mb-1 col-12 px-2">
                  <Password
                    v-model="form.password"
                    :feedback="false"
                    class="text-center w-100"
                    placeholder="رمز عبور"
                    :class="{'p-invalid': v$.password.$invalid && submitted}"
                    toggleMask
                  />
                </div>
                <div class="d-grid col-11 mx-auto pt-3 mt-5">
                  <button class="text-white bg-blue-1 rounded-pill p-3">ورود</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import {ToastNotificationService} from "~/core/toast-notification-service";
import {required} from '@vuelidate/validators';
import {useVuelidate} from "@vuelidate/core";
import {UseLoading} from "~/store/loading-store";
import {MakeResponse} from "~/core/make-response"
import Download from "~/components/Download.vue"

const {$pwa} = useNuxtApp()



definePageMeta({
  layout: "login",
});

const submitted = ref(false);
const router = useRouter();
const isMobile = ref(false);
const pageContainer = ref(null);
const store = UseLoading();
const UpdateModal = ref(localStorage.getItem('updatemodal') ? localStorage.getItem('updatemodal') : true)
const form = ref({
  password: null,
  username: null,
});
const onFocusIn = () => {
  window.scroll(0, 200);
};

const onFocusOut = () => {
  window.scroll(0, 0);
};

const rules = computed(() => {
  return {
    username: {required},
    password: {required},
  };
});

const v$ = useVuelidate(rules, form);

const login = async () => {
  submitted.value=true
  if (!v$.value.$invalid) {
    MakeResponse.Login(store,form.value,(result: any) => {
      if (result.status === 200 && result.data.result == false) {
        ToastNotificationService.error(result.data.serverErrors[0].hint);
      }
      else if(result.status === 200 && result.data.serverErrors==null) {
        ToastNotificationService.success("ورود با موفقیت انجام شد");
        router.push("/")
        localStorage.setItem("SupervisoryInfo", JSON.stringify(result.data.result))
      };
    })
  } else {
    ToastNotificationService.warn("فیلد های اجباری را لطفا تکمیل کنید");
  }
};

const UpdateModalHandle = () => {
  localStorage.setItem('updatemodal', false)
  UpdateModal.value = false
}

onMounted(() => {
  MakeResponse.GetSurveyBaseInfo()
  window.addEventListener("keyboardDidShow", handleKeyboardShow);
  window.addEventListener("keyboardDidHide", handleKeyboardHide);
});

const handleKeyboardShow = () => {
  pageContainer.value.scrollIntoView({behavior: "smooth", block: "start"});
};

const handleKeyboardHide = () => {
  pageContainer.value.scrollIntoView({behavior: "smooth", block: "end"});
};

</script>

<style>
</style>
