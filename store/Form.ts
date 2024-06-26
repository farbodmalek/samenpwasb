
import {defineStore} from "pinia";



export const Useform = defineStore('form', {
  state: () => (
    {
      addressform:{},
      form: {
        loanPlan:{},
        survey:{
          planIndustrialSurvey:null,
          planGardenSurvey:null,
          planLivestockSurvey:null,
          planServiceSurvey:null
        },
        LoanPlanNo:{
          Id :11984,
          LoanSurveyEconomicTypeId :null,
          PlanNoId :11984 ,
          UserPlanNoText :null,
          LoanId :null,
          UserOtherPlanNo :null
        }
      },
    }
  ),
  actions: {
    getFormStepOne(data:any) {
      this.form.loanPlan =  data
      this.form.loanPlan = data;
      this.form.survey.isValidPlanNo = data.isValidPlanNo;
      this.form.LoanPlanNo.UserPlanNoText = data.UserPlanNoText;
      this.form.LoanPlanNo.UserOtherPlanNo = data.UserOtherPlanNo;
      this.form.LoanPlanNo.LoanId = data.LoanId;
    },
    getFormStepTow(data:any){
      this.form.loanPlan.insuranceTypeId = data.insuranceTypeId;
      this.form.loanPlan.workShopCode = data.workShopCode;
      this.form.survey.longitude = this.form.loanPlan.longitude;
      this.form.survey.latitude = this.form.loanPlan.latitude;
      this.form.survey.numberOfInsurdPerson = data.numberOfInsurdPerson;
      this.form.survey.numberOfJobsCreated = data.numberOfJobsCreated;
      this.form.survey.planActivationTypeId = data.planActivationTypeId;
      this.form.survey.endOfActivationDate = data.endOfActivationDate;
      this.form.survey.IsOfflline = 0;
      this.form.survey.planId = null;
      if (this.form.loanPlan.loanSurveyEconomidTypeId == 3) {
        this.form.survey.planServiceSurvey = {
          HasWorkPermission: data.HasWorkPermission,
          OwnerTypeId: data.OwnerTypeId,
        };
      }
      if (this.form.loanPlan.loanSurveyEconomidTypeId == 4) {
        this.form.survey.planIndustrialSurvey = {
          HasWorkPermission: data.HasWorkPermission,
          OwnerTypeId: data.OwnerTypeId,
        };
      }
      if (this.form.loanPlan.loanSurveyEconomidTypeId ==1) {
        this.form.survey.planLivestockSurvey = {
          LivestockBooklet: data.LivestockBooklet,
          LivestockLicense: data.LivestockLicense,
          LivestockInsurance: data.LivestockInsurance,
          InsuranceDate: data.InsuranceDate,
          NumberOfInsuredLivestock: data.NumberOfInsuredLivestock,
          LivestockTypeId: data.LivestockTypeId,
          NumberOfMaleLivestock: data.NumberOfMaleLivestock,
          NumberOfFemaleLivestock: data.NumberOfFemaleLivestock,
          livestockTypes: data.livestockType,
        };
      }
      if (this.form.loanPlan.loanSurveyEconomidTypeId == 2) {
        this.form.survey.planGardenSurvey = {
          OwnerTypeId: data.OwnerTypeId,
          ProductTypeId: data.ProductTypeId,
          LandArea: data.LandArea,
          CultivatedLandArea: data.CultivatedLandArea,
          HasAgriculturalInsurance: data.HasAgriculturalInsurance,
          EndOfAgriculturalInsurance: data.EndOfAgriculturalInsurance,
        };
      }
    },
    loadFormData() {
      const form1 = JSON.parse(<any>localStorage.getItem('firPreForm'));
      const form2 = JSON.parse(<any>localStorage.getItem('SecPreForm'));
      if (form1 && form2) {
        this.getFormStepOne(form1)
        this.getFormStepTow(form2)
      }else if(form1){
        this.getFormStepOne(form1)
      }
    },
    getAddress(data:any){
      this.addressform=data
    }
  }
})
