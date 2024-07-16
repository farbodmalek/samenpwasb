import axios from "axios";
import {ToastNotificationService} from "~/core/toast-notification-service";

let db: any
const DB_NAME = '"offlineImagesDB"';
const DB_VERSION = 1;
const images: any[] = [];
let guidList: any[] = [];
const router = useRouter();
let lounplanfrom = "";
const SupervisoryInfo = localStorage.getItem("User-data");
const supervisoryInfo = SupervisoryInfo ? JSON.parse(SupervisoryInfo) : {}
const Url = useRuntimeConfig().public.base_API;
const MonitoredInfo = ref()
const config = {
    headers: {Authorization: "Bearer " + supervisoryInfo.token,},
};

export class MakeOfflineServiese {

    static openDatabase() {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = (event) => {
            ToastNotificationService.error(`Error opening indexedDB:${event}`,)
        };
        request.onupgradeneeded = (event:any) => {
            db = event.target.result;
            db.createObjectStore("offlineImages", {autoIncrement: true});
        };
        request.onsuccess = (event:any) => {
            db = event.target.result;
            this.getImagesFromDB();
        };
    };

    static getImagesFromDB() {
        if (!db) {
            console.error("IndexedDB is not initialized.");
            return;
        }
        const transaction = db.transaction(["offlineImages"], "readonly");
        const objectStore = transaction.objectStore("offlineImages");
        const request = objectStore.openCursor();
        request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
                images.push(cursor.value);
                cursor.continue();
            } else {
            }
        };
        request.onerror = (event: any) => {
            ToastNotificationService.error(`خطا در دریافت عکس از حافظه:${event}`,)
        };
    };

  static SetSurveyImage(MonitoredInfo: any, onComplete: (result: any) => void) {
    return new Promise((resolve, reject) => {
      onComplete({ getinfo: true, sendphoto: false });
      const filteredImages = images.filter((image) => image.userId == MonitoredInfo.id);
      filteredImages.map((image, index) => {
        const data = JSON.parse(<any>localStorage.getItem(`userId_${MonitoredInfo.id}`));
        const formData = new FormData();
        formData.append("image", image.file.file);
        onComplete({getinfo: false,sendphoto: true});
        axios.post(
          `${Url + 'api/Upload/uploadSurveyImage'}`,
          formData,
          config,
          MonitoredInfo.loanId
        ).then((response: any) => {
          onComplete({ getinfo: false, sendphoto: true });
          guidList.push(response.data.results[0]);
          data.survey.guidList = guidList;
          lounplanfrom = data;
          if (filteredImages.length==guidList.length) {
            onComplete({ getinfo: false, sendphoto: false });
            resolve();
          }
        })
          .catch((error: any) => {
            onComplete({ getinfo: false, sendphoto: false });
            this.ErrorHandling(error);
            reject(error);
          });
      });
    });
  };

    static async SetLoanPlanSurvey(onComplete: (result: any) => void,): Promise<void> {
        lounplanfrom.survey.IsOfflline=1
        try {
            onComplete({ getinfo: false, sendphoto: false,iSSend:false });
            const response = await axios.post(
                `${Url + 'api/survey/SetLoanPlanSurvey'}`,
                lounplanfrom,
                config
            );

            if (response.status === 200 && response.data.result == null) {
                ToastNotificationService.warn(response.data.serverErrors[0].hint);
              onComplete({ getinfo: false, sendphoto: false,iSSend:false });
            }
            else if(response.status === 200 && response.data.serverErrors.length==0) {
                const keyToDelete = `userId_${lounplanfrom.loanPlan.cartableId}`;
                localStorage.removeItem(keyToDelete);
                this.removeFileFromDB(lounplanfrom.loanPlan.cartableId);
                onComplete({ getinfo: false, sendphoto: false,iSSend:true });
            }
        } catch (err: any) {
            onComplete({ getinfo: false, sendphoto: false,success:false });
            this.ErrorHandling(err);
        }
        this.openDatabase();
    }

    static async removeFileFromDB(userId: any) {
        const transaction = db.transaction(["offlineImages"], "readwrite");
        const objectStore = transaction.objectStore("offlineImages");
        const images: any[] = [];
        const request = objectStore.openCursor();
        request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
                images.push(cursor.value);
                images.forEach(() => {
                    if (cursor.value.userId == userId) {
                        const deleteRequest = objectStore.delete(cursor.primaryKey);
                        return;
                    }
                })
                cursor.continue();
            }
        };
        request.onerror = (event: any) => {
            ToastNotificationService.error(`Error finding file in IndexedDB:${event}`);

        };
    };

    static ErrorHandling(err: any) {
        if (err.response && err.response.status === 500) {
            ToastNotificationService.error("خطای 500 سرور لطفا  مجددا تلاش کنید " + err.response.data.serverErrors[0].hint, 10000);
        } else if (err.response && err.response.status === 400) {
            const [firstErrorKey, firstErrorMessages]: any = Object.entries(err.response.data.errors)[0];
            const firstMessage = firstErrorMessages[0];
            ToastNotificationService.error(`${firstMessage}ارور 400 خطای داخلی سیستم لطفا با پشتیبانی تماس بگیرید`, 10000);
        } else if (err.code === "ERR_NETWORK") {
            ToastNotificationService.error("خطا در برقراری ارتباط به اینترنت متصل شوید");
        }
        else {
            ToastNotificationService.error(`خطای  سیستم:${err}`,)
        }
    }

}
