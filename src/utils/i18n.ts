import {createI18n} from 'vue-i18n';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import en from '../translations/en.yaml';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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