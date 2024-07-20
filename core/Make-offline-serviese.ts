
import {ToastNotificationService} from "~/core/toast-notification-service";

let db: any

export class MakeOfflineServiese {

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



}
