export class BasePage{


    public static loggedUserInfo: any;

    public static config = {};

    public getBaseAPI(){
        return useRuntimeConfig().public.base_API
    }

    public static getLoggedUser() {
        this.loggedUserInfo = JSON.parse(<string>localStorage.getItem('user-data'));
        if (this.loggedUserInfo) {
            this.config = {headers: {'Authorization': 'Bearer ' + this.loggedUserInfo.token}};
            return this.loggedUserInfo;
        } else {
            localStorage.removeItem('user-data');
            return null;
        }
    }

}