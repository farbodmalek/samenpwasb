import {toast, ToastTheme} from "vue3-toastify";

export class ToastNotificationService {
    static error(text: string,
                 autoClose: number = 3000,
                 position = toast.POSITION.TOP_CENTER,
                 transition = toast.TRANSITIONS.ZOOM,
                 theme: ToastTheme = 'colored') {
        toast.error(text, {
            autoClose: autoClose,
            position: position,
            transition: transition,
            theme: theme,
            rtl: true,
        });
    }

    static success(text: string,
                   autoClose: number = 3000,
                   position = toast.POSITION.TOP_CENTER,
                   transition = toast.TRANSITIONS.ZOOM,
                   theme: ToastTheme = 'colored') {
        toast.success(text, {
            autoClose: autoClose,
            position: position,
            transition: transition,
            theme: theme,
            rtl: true,
        });
    }

    static info(text: string,
                autoClose: number = 3000,
                position = toast.POSITION.TOP_CENTER,
                transition = toast.TRANSITIONS.ZOOM,
                theme: ToastTheme = 'colored') {
        toast.info(text, {
            autoClose: autoClose,
            position: position,
            transition: transition,
            theme: theme,
            rtl: true,
        });
    }

    static warn(text: string,
                autoClose: number = 3000,
                position = toast.POSITION.TOP_CENTER,
                transition = toast.TRANSITIONS.ZOOM,
                theme: ToastTheme = 'colored') {
        toast.warning(text, {
            autoClose: autoClose,
            position: position,
            transition: transition,
            theme: theme,
            rtl: true,
        });
    }

    static dark(text: string,
                autoClose: number = 3000,
                position = toast.POSITION.TOP_CENTER,
                transition = toast.TRANSITIONS.ZOOM) {
        toast.dark(text, {
            autoClose: autoClose,
            position: position,
            transition: transition,
            rtl: true,
        });
    }
}