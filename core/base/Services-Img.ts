
import {ToastNotificationService} from "~/core/toast-notification-service";


let db: any
const DB_NAME = '"offlineImagesDB"';
const DB_VERSION = 1;

export class ServicesImg {

    public static images: any[] = [];
    static openDatabase(status:boolean, onComplete: (result: any) => void) {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = (event) => {
            ToastNotificationService.error(`Error opening indexedDB: ${event}`);
        };
        request.onupgradeneeded = (event: any) => {
            db = event.target.result;
            db.createObjectStore("offlineImages", {autoIncrement: true});
        };
        request.onsuccess = async (event: any) => {
            db = event.target.result;
            if (status) {
                await this.getImgsDB();  // Wait for getImgsDB to complete
            }
            onComplete(this.images);
            this.images=[]

        };
    }

    static getImgsDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!db) {
                console.error("IndexedDB is not initialized.");
                reject("IndexedDB is not initialized.");
                return;
            }
            const transaction = db.transaction(["offlineImages"], "readonly");
            const objectStore = transaction.objectStore("offlineImages");
            const request = objectStore.openCursor();
            request.onsuccess = (event: any) => {
                const cursor = event.target.result;
                if (cursor) {
                    this.images.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve();  // Resolve the promise when the cursor is exhausted
                }
            };
            request.onerror = (event: any) => {
                ToastNotificationService.error(`خطا در دریافت عکس از حافظه: ${event}`);
                reject(event);
            };
        });
    }

    static saveImgTodDB = (file:any,userId:any,lounId:any) => {
        const transaction = db.transaction([`offlineImages`], "readwrite");
        const objectStore = transaction.objectStore("offlineImages");
        const request = objectStore.add({
            file: file,
            userId: userId,
            lounId: lounId,
        });
        request.onsuccess = () => {
        };
        request.onerror = (event:any) => {
            ToastNotificationService.error("خطا در ذخیره عکس در حافظه", event)
        };
    };

    static removeImgDB = (file:any) => {
        const transaction = db.transaction(["offlineImages"], "readwrite");
        const objectStore = transaction.objectStore("offlineImages");
        const request = objectStore.openCursor();
        request.onsuccess = (event:any) => {
            const cursor = event.target.result;
            if (cursor) {
                const storedFile = cursor.value.file;
                if (storedFile.name === file.name) {
                    cursor.delete();
                    return;
                }
                cursor.continue();
            }
        };
        request.onerror = (event:any) => {
            ToastNotificationService.error("خطا در حذف عکس از حافظه", event)
        };
    };





}
