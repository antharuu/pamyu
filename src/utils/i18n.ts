import { createI18n } from "vue-i18n";

import en from "../translations/en.json";
import fr from "../translations/fr.json";

export default createI18n({
    locale: "fr",
    fallbackLocale: "en",
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        fr
    }
});