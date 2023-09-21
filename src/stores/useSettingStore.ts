import {defineStore} from "pinia";
import {Color} from "../types/globals";
import {colorAsString} from "../utils/tools";

export const useSettingStore = defineStore('Settings', {
    state: (): {
        locale?: 'fr' | 'en';
        theme?: {
            color?: Color;
        }
    } => ({
        locale: "en",
        theme: {color: "#6b8afd"}
    }),
    getters: {
        getLocale: (state) => state?.locale ?? 'en',
        getThemeColor: (state) => colorAsString(state?.theme?.color ?? '#6b8afd')
    },
    actions: {
        setLocale(locale: string) {
            this.locale = locale;
        },
        setThemeColor(color: Color) {
            const validColor = colorAsString(color);
            this.theme = {color: validColor};
        }
    }
})