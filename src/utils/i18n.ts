import {createI18n} from 'vue-i18n';

import en from '../translations/en.yaml';
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