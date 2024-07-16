import {BaseApi} from "../base/base-api";


export class CommonServices extends BaseApi {

    static login(body: any) {
        const url = this.getBaseAPI() + 'api/auth/login';
        return BaseApi.postApiLogin(url, body);
    }
    static GetCartables() {
        const url = this.getBaseAPI() + 'api/survey/GetCartables';
        this.getLoggedUser()
        const body={pageNumber: 1, take: 1000,cartableStatusTypeId:2, userId: this.getLoggedUser().id}
        return BaseApi.postApi(url, body);
    }
    static GetSurveys() {
        const url = this.getBaseAPI() + 'api/survey/GetSurveysListForPWA';
        this.getLoggedUser()
        const body={pageNumber: 1, take: 1000, userId: this.getLoggedUser().id}
        return BaseApi.postApi(url, body);
    }

    static GetSurveyBaseInfo() {
        const url = this.getBaseAPI() + 'api/survey/GetSurveyBaseInfo';
        return BaseApi.getApiLogin(url);
    }

    static SetLoanPlanSurvey(body:any){
        const url = this.getBaseAPI() + 'api/survey/SetLoanPlanSurvey';
        return BaseApi.postApi(url, body);
    }


}
