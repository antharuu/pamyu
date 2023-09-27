import {defineStore} from 'pinia';

import {getColorAsHex} from '../utils/tools';

import {Color} from '../types/globals';

export const useSettingStore = defineStore('Settings', {
    state: (): {
        locale?: 'fr' | 'en';
        theme?: {
            color?: Color;
        },
        renpyPath?: string;
    } => ({
        locale: 'en',
        theme: {color: '#6b8afd'},
        renpyPath: undefined
    }),
    getters: {
        getLocale: (state) => state?.locale ?? 'en',
        getThemeColor: (state) => getColorAsHex(state?.theme?.color ?? '#6b8afd'),
        hasRenpyPath: (state) => !!state.renpyPath
    },
    actions: {
        setLocale(locale: 'fr' | 'en') {
            this.locale = locale;
        },
        setThemeColor(color: Color) {
            const validColor = getColorAsHex(color);
            this.theme = {color: validColor};
        },
        setRenpyPath(path: string | undefined) {
            this.renpyPath = path;
        }
    }
});