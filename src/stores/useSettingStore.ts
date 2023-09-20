import {defineStore} from "pinia";

export const useSettingStore = defineStore({
    id: "Settings",
    state: (): {
        locale: string;
    } => ({
        locale: "fr"
    }),
    getters: {
        getLocale: (state) => state.locale
    },
    actions: {
        setLocale: (locale: string) => this.locale = locale
    }
})