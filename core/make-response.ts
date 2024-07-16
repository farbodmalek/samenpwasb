import {ToastNotificationService} from "~/core/toast-notification-service";

export class makeResponse {

    static FindOfflineForm(onComplete: (result: any) => void) {
        for (let i = 0; i < localStorage.length; i++) {
            const key: any = localStorage.key(i);
            if (key.startsWith("user")) {
                const userId = key.substring(7)
                const data = JSON.parse(<any>localStorage.getItem('Cartables'));
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
        localStorage.removeItem("User-data");
        localStorage.removeItem("SurveysList")
        localStorage.removeItem("nuxt-color-mode");
        localStorage.removeItem("Cartables");
        for (let i = 0; i < localStorage.length; i++) {
            const key: any = localStorage.key(i);
            if (key.startsWith("user")) {
                localStorage.removeItem(key)
            }
        }
        const router = useRouter();
        router.push("/login");
    }

    static Clearlocalform() {
        localStorage.removeItem("firPreForm");
        localStorage.removeItem("SecPreForm");
        localStorage.removeItem("FinalRegistrationform");
    }


}
