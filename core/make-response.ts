import axios from "axios";
import {ToastNotificationService} from "~/core/toast-notification-service";

const router = useRouter();
const SupervisoryInfo = localStorage.getItem("SupervisoryInfo");
const supervisoryInfo = SupervisoryInfo ? JSON.parse(SupervisoryInfo) : {}
const Url = useRuntimeConfig().public.base_API;
const config = {headers: {Authorization: "Bearer " + supervisoryInfo.token}};
const currentDate = new Date();
const todayDateString = currentDate.toISOString().split('T')[0]
const opt ={pageNumber: 1, take: 1000, cartableStatusTypeId:1}
const optsupervisory = {"pageNumber": 1, "take": 1000, "userId": supervisoryInfo.id}

export class MakeResponse {
  static Login(store: any, form: any, onComplete: (result: any) => void) {
    store.getLoadingShow()
  axios.post(
    `${Url + "/api/auth/login"}`,
    form)
    .then((response: any) => {
      store.getLoadingHide()
      onComplete(response)
    })
    .catch((err: any) => {
      store.getLoadingHide()
      this.ErrorHandling(err)
    })
}
  static GetCartables(store: any, onComplete: (result: any) => void) {
    store.getLoadingShow()
    axios.post(`${Url + "api/survey/GetCartables"}`, opt, config)
      .then((res: any) => {
        if (res.data.results) {
          const Cartables = res.data.results.filter((item: any) => item.expireDate.substring(0, 10) >= todayDateString);
          localStorage.setItem("GetCartables", JSON.stringify(Cartables));
          onComplete(Cartables)
        }
        store.getLoadingHide()
      })
      .catch((err: any) => {
        store.getLoadingHide()
        onComplete(err)
        this.ErrorHandling(err)
      })
  }
  static GetSurveysList() {
    const SupervisoryInfo = localStorage.getItem("SupervisoryInfo");
    const supervisoryInfo = SupervisoryInfo ? JSON.parse(SupervisoryInfo) : {}
    const config = {headers: {Authorization: "Bearer " + supervisoryInfo.token}};
    axios.post(
      `${Url + "api/survey/GetSurveysListForPWA"}`, optsupervisory,
      config)
      .then((res: any) => {
        localStorage.setItem("GetSurveysList", JSON.stringify(res.data.results));
      }).catch((err: any) => {
      this.ErrorHandling(err)
    })
  }
  static GetSurveyBaseInfo() {
    axios.get(
      `${Url + "api/survey/GetSurveyBaseInfo"}`,
    ).then((res) => {
      localStorage.setItem("SurveyBaseInfo", JSON.stringify(res.data.result))
    }).catch((err: any) => {
      this.ErrorHandling(err)
    })
  }


  static FindOfflineForm(onComplete: (result: any) => void) {
    for (let i = 0; i < localStorage.length; i++) {
      const key: any = localStorage.key(i);
      if (key.startsWith("user")) {
        const userId = key.substring(7)
        const data = JSON.parse(<any>localStorage.getItem('GetCartables'));
        const targetObject = data.findIndex((item: any) => item.id === Number(userId));
        onComplete(targetObject)
      }
    }
  }

  static ErrorHandling(err: any) {
    if (err.response && err.response.status === 500) {
      ToastNotificationService.error("خطای 500 سرور لطفا  مجددا تلاش کنید " + err.response.data.serverErrors[0].hint, 10000);
    } else if (err.response && err.response.status === 400) {
      const [firstErrorKey, firstErrorMessages]: any = Object.entries(err.response.data.errors)[0];
      const firstMessage = firstErrorMessages[0];
      ToastNotificationService.error(`${firstMessage}ارور 400 خطای داخلی سیستم لطفا با پشتیبانی تماس بگیرید`, 10000);
    } else if (err.response && err.response.status === 401) {
      this.logout()
      ToastNotificationService.error("عدم احراز هویت");
    } else if (err.code === "ERR_NETWORK") {
      ToastNotificationService.error("خطا در برقراری ارتباط به اینترنت متصل شوید");
    } else {
      ToastNotificationService.error(`خطای  سیستم:${err}`,)
    }
  }


  static logout() {
    localStorage.removeItem("SurveyBaseInfo");
    localStorage.removeItem("SupervisoryInfo");
    localStorage.removeItem("GetSurveysList")
    localStorage.removeItem("nuxt-color-mode");
    localStorage.removeItem("GetCartables");
    for (let i = 0; i < localStorage.length; i++) {
      const key: any = localStorage.key(i);
      if (key.startsWith("user")) {
        localStorage.removeItem(key)
      }
    }
    const router = useRouter();
    router.push("/login");
  }

  static Clearlocalform (){
    localStorage.removeItem("firPreForm");
    localStorage.removeItem("SecPreForm");
    localStorage.removeItem("FinalRegistrationform");
}



}
