import {BaseApi} from "../base/base-api";


export class CommonServices extends BaseApi {

    static login(body: any) {
        const url = this.getBaseAPI() + 'api/auth/login';
        return BaseApi.postApiLogin(url, body);
    }
    static GetCartables(body: any) {
        const url = this.getBaseAPI() + 'api/survey/GetCartables';
        return BaseApi.postApi(url, body);
    }


}
