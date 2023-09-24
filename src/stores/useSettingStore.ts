import {defineStore} from 'pinia';

import {getColorAsHex} from '../utils/tools';

import {Color} from '../types/globals';

export const useSettingStore = defineStore('Settings', {
    state: (): {
        locale?: 'fr' | 'en';
        theme?: {
            color?: Color;
        }
    } => ({
        locale: 'en',
        theme: {color: '#6b8afd'}
    }),
    getters: {
        getLocale: (state) => state?.locale ?? 'en',
        getThemeColor: (state) => getColorAsHex(state?.theme?.color ?? '#6b8afd')
    },
    actions: {
        setLocale(locale: string) {
            this.locale = locale;
        },
        setThemeColor(color: Color) {
            const validColor = getColorAsHex(color);
            this.theme = {color: validColor};
        }
    }
});