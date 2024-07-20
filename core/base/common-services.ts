import {BaseApi} from "../base/base-api";


export class CommonServices extends BaseApi {

    static login(body: any) {
        const url = this.getBaseAPI() + 'api/auth/login';
        return BaseApi.postApiLogin(url, body);
    }
    static GetCartables() {
        const url = this.getBaseAPI() + 'api/survey/GetCartables';
        this.getLoggedUser()
        const body={pageNumber: 1, take: 1000,cartableStatusTypeId:1, userId: this.getLoggedUser().id}
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

    static SetLoanPlanSurvey(body: any) {
        const url = this.getBaseAPI() + 'api/survey/SetLoanPlanSurvey';
        return BaseApi.postApi(url, body);
    }

    static async SetSurveyImage(body: any) {
        const url = this.getBaseAPI() + 'api/Upload/uploadSurveyImage';
        await this.getLoggedUser();
        return BaseApi.postApi(url, body)
    }

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
    static Clearform() {
        localStorage.removeItem("firPreForm");
        localStorage.removeItem("SecPreForm");
        localStorage.removeItem("FinalRegistrationform");
    }

}
