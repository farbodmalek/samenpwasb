export class BasePage {
    public static loggedUserInfo: any;
    public static config = {};

    static getBaseAPI() {
        return useRuntimeConfig().public.base_API
    }

    public static getLoggedUser() {
        this.loggedUserInfo = JSON.parse(<string>localStorage.getItem('User-data'));
        if (this.loggedUserInfo) {
            this.config = {headers: {'Authorization': 'Bearer ' + this.loggedUserInfo.token}};
            return this.loggedUserInfo;
        } else {
            localStorage.removeItem('User-data');
            return null;
        }
    }

}