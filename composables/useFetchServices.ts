// import type {UseFetchOptions} from "nuxt/app";
// import {UseLoading} from "../store/loading-store";
// import {BasePage} from "../core/base/base-page";
// import {toast} from "vue3-toastify";
//
//
// const useFetchServices = async (url: string, options?: UseFetchOptions<object>, loader: boolean = true) => {
//
//     try {
//         const token = 'Bearer ' + BasePage.getLoggedUser()?.token;
//         const loading = UseLoading();
//         const option = {
//             ...options,
//
//             onRequest({options}) {
//                 const headers = new Headers(options.headers);
//                 headers.set("Authorization", `${token}`);
//                 options.headers = headers;
//                 if (loader)
//                     loading.getLoadingShow();
//             },
//
//             onRequestError({request, options, error}) {
//                 if (loader)
//                     loading.getLoadingHide();
//                 toast.error('خطا در برقراری ارتباط با سرور');
//             },
//
//             onResponse({request, response, options}) {
//                 if (response._data && response._data.serverErrors && response._data.serverErrors.length > 0) {
//                     toast.error(response._data.serverErrors[0].hint);
//                 } else if (response.status === 400) {
//                     toast.error('خطا در انجام عملیات');
//                 }
//
//                 if (loader)
//                     loading.getLoadingHide();
//             },
//
//             onResponseError({request, response, options}) {
//                 if (response && response.status === 401) {
//                     if (loader)
//                         loading.getLoadingHide();
//                     localStorage.removeItem('token');
//                     return navigateTo('/authorization/login');
//                 }
//             }
//         };
//
//         const {data, error} = await useFetch(url, option);
//         if (error) {
//             // console.log(error.value)
//         }
//         return data._rawValue;
//     } catch (e) {
//     }
//
// }
//
// const getApi = async (url: string, loader: boolean = true, options?: any) => {
//     const loading = UseLoading();
//     const data = await useFetchServices(url, {method: 'GET'}, loader);
//     if (data && loader) {
//         loading.getLoadingHide();
//     }
//     return data
// }
//
// const postApi = async (url: string, options: any, loader: boolean = true) => {
//     const loading = UseLoading();
//     const data = await useFetchServices(url, {method: 'POST', body: options}, loader);
//     if (data && loader) {
//         loading.getLoadingHide();
//     }
//     return data
// }
//
//
//
// export default {
//     getApi,
//     postApi
// }
import type { UseFetchOptions } from "nuxt/app";
import { UseLoading } from "../store/loading-store";
import { BasePage } from "../core/base/base-page";
import { toast } from "vue3-toastify";

const useFetchServices = async (url: string, options?: UseFetchOptions<object>, loader: boolean = true) => {
    try {
        const token = 'Bearer ' + BasePage.getLoggedUser()?.token;
        const loading = UseLoading();

        const config = {
            ...options,
            headers: {
                ...options?.headers,
                Authorization: token,
            },
            async onRequest({ options }) {
                if (loader) loading.getLoadingShow();
            },
            onRequestError({ error }) {
                if (loader) loading.getLoadingHide();
                toast.error('خطا در برقراری ارتباط با سرور');
            },
            async onResponse({ response }) {
                if (loader) loading.getLoadingHide();

                if (response._data && response._data.serverErrors?.length) {
                    toast.error(response._data.serverErrors[0].hint);
                } else if (response.status === 400) {
                    toast.error('خطا در انجام عملیات');
                } else if (response.status === 500) {
                    toast.error('خطای داخلی سرور');
                }
            },
            onResponseError({ response }) {
                if (response?.status === 401) {
                    if (loader) loading.getLoadingHide();
                    localStorage.removeItem('token');
                    navigateTo('/authorization/login');
                } else if (response?.status === 500) {
                    if (loader) loading.getLoadingHide();
                    toast.error('خطای داخلی سرور');
                }
            },
        };

        // ارسال درخواست با $fetch
        const data = await $fetch(url, config);
        return data;
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Network Error: Failed to fetch data', data: null };
        if (!navigator.onLine) {
            toast.error('ارتباط اینترنتی شما قطع است');
        } else {
            toast.error('خطای شبکه: لطفاً بعداً مجدداً تلاش کنید');
        }

        if (loader) UseLoading().getLoadingHide();

        // برگرداندن نتیجه پیش‌فرض در صورت بروز خطا

    }
};

const getApi = async (url: string, loader: boolean = true, options?: any) => {
    const data = await useFetchServices(url, { method: 'GET' }, loader);
    if (loader) UseLoading().getLoadingHide();
    return data;
};

const postApi = async (url: string, body: any, loader: boolean = true) => {
    const data = await useFetchServices(url, { method: 'POST', body }, loader);
    if (loader) UseLoading().getLoadingHide();
    return data;
};

export default {
    getApi,
    postApi
};
