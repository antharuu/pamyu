import {defineStore} from "pinia";

export const useUserConfig = defineStore({
    id: "Config",
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