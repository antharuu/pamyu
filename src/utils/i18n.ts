import {createI18n} from 'vue-i18n';

// @ts-ignore
import en from '../translations/en.yaml';
// @ts-ignore
import fr from '../translations/fr.yaml';

export default createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en: en.en,
        fr: fr.fr
    }
});