import {ToastNotificationService} from "~/core/toast-notification-service";
import {UseLoading} from "../store/loading-store";
import {promises} from "dns";

export class MakeResponse {
    static notificationService = ToastNotificationService;

    static makeServerResponse(method: Promise<any>, isLoading: boolean, onComplete: (result: any) => void,isToast: boolean,) {
        const loadingMethod = UseLoading();
        if (isLoading) {
            loadingMethod.getLoadingShow();
        }
        method.then((result: any) => {
            const connectionErrorMessage = 'خطا در برقراری ارتباط با سرور، لطفاً مجددا تلاش نمایید.';
            if (result === null) {

                loadingMethod.getLoadingHide();
                this.notificationService.error(connectionErrorMessage);
                onComplete(null);
            } else{

                if (result && result.serverErrors && result.serverErrors.length > 0) {

                    loadingMethod.getLoadingHide();
                    if (result.serverErrors[0].code === 401) {

                        this.notificationService.error('عدم احراز هویت توسط سیستم.');
                    } else {

                        this.notificationService.warn(result.serverErrors[0].hint);
                    }
                }
                if (result && result.errors && result.errors.length > 0) {

                    loadingMethod.getLoadingHide();
                    for (const item of result.errors) {
                        this.notificationService.error(item);
                    }
                    onComplete(result);
                } else if (result != null) {

                    onComplete(result);
                    loadingMethod.getLoadingHide();
                } else {

                    loadingMethod.getLoadingHide();
                    this.notificationService.error(connectionErrorMessage);
                    onComplete(null);
                }
            }

        }).catch(result => {
            loadingMethod.getLoadingHide();
            if (result.response && result.response.status === 404) {
                this.notificationService.error('خطای سیستمی ');
            } else if (result.response && result.response.status === 400) {
                const firstKey = Object.keys(result.response.data)[0];
                ToastNotificationService.error(`${ result.response.data[firstKey][0]}ارور 400 خطای داخلی سیستم لطفا با پشتیبانی تماس بگیرید`, 10000);
            }else if (result.response && result.response.status === 500) {
                ToastNotificationService.error("خطای 500 سرور لطفا  مجددا تلاش کنید " + result.response.data.serverErrors[0].hint, 10000);
            } else if (result.response && result.response.status === 401) {
                this.notificationService.error('عدم احراز هویت توسط سیستم.');
                localStorage.clear();
                navigateTo("/authorization/login");
            } else if (result.code === "ERR_NETWORK"){
                onComplete("ERR_NETWORK");
                if(isToast)
                ToastNotificationService.error("خطا در برقراری ارتباط به اینترنت متصل شوید");
            } else {
                this.notificationService.error('خطای سیستمی. لطفا به راهبر سیستم گزارش شود.');
                onComplete(null);
            }
            onComplete(null);
        });
    }

}