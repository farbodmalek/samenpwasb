import {BasePage} from "~/core/base/base-page";


const uploadSurveyImage = () => {
    return BasePage.getEnv() + 'api/Upload/uploadSurveyImage';
}

const setLoanPlanSurvey = () => {
    return BasePage.getEnv() + 'api/survey/SetLoanPlanSurvey';
}

const getSurveysListForPWA = () => {
    return BasePage.getEnv() + 'api/survey/GetSurveysListForPWA';
}

const getSurveyBaseInfo = () => {
    return BasePage.getEnv() + 'api/survey/GetSurveyBaseInfo';
}

const getCartables = () => {
    return BasePage.getEnv() + 'api/survey/GetCartables';
}

export default {

    uploadSurveyImage,
    setLoanPlanSurvey,
    getSurveysListForPWA,
    getSurveyBaseInfo,
    getCartables,
}

