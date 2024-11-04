import axios from 'axios'

import {BasePage} from "./base-page";

export class BaseApi extends BasePage {
    public static con = {};
    public static progress = ref();

    public static async postApi (url:string,body:any){
        this.getLoggedUser()
        this.con = {
            headers: { 'Authorization': 'Bearer ' + this.loggedUserInfo.token,
                       'DeviceName':'IsPwa'

            },
            onUploadProgress: (progressEvent: any) => {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                this.progress.value=progress
            },
        };
         return await axios.post(url,body,this.con).then(((r:any)=>r.data))
    }

    public static async getApi (url:string){
        this.getLoggedUser()
         return await axios.get(url,this.config).then(((r:any) =>r.data))
    }

    public static async postApiLogin(url: string, body: any) {
        this.con = {
            headers: {
                'Content-Type': 'application/json',
                'DeviceName': 'IsPwa'
            }
        };
        return await axios.post(url, body, this.con).then((r: any) => r.data);
    }

    public static async getApiLogin(url: string) {

        return await axios.get(url,null,this.con).then((r:any) => r.data);
    }

}