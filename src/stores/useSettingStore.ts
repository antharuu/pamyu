import {defineStore} from "pinia";

export const useSettingStore = defineStore('Settings', {
    state: (): {
        locale: string;
    } => ({
        locale: "fr"
    }),
    getters: {
        getLocale: (state) => state.locale
    },
    actions: {
        setLocale(locale: string) {
            console.log("Setting locale to", locale);
            console.log(this)
            console.log(this.locale)
            this.locale = locale;
            console.log(this.locale)
        }
    }
})