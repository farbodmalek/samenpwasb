import { defineStore } from 'pinia';

export const useSurveyStore = defineStore('surveyStore', {
    state: () => ({
        cartables: JSON.parse(localStorage.getItem('Cartables') || '[]'),
        surveysList: JSON.parse(localStorage.getItem('SurveysList') || '[]'),
        infoMonitored: '',
    }),
    getters: {
        getCartableUserDataById: (state) => (loanId: number) => {

            return state.cartables.find((item: any) => item.loanId === loanId);
        },
        getFilteredSurveys: (state) => (loanId: number) => {
            return state.surveysList.filter((item: any) => item.id === loanId);
        },
    },
    actions: {
        loadFromLocalStorage() {
            this.cartables = JSON.parse(localStorage.getItem('Cartables') || '[]');
            this.surveysList = JSON.parse(localStorage.getItem('SurveysList') || '[]');
        },
    },
});
