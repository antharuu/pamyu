import {createI18n} from 'vue-i18n';

import ar from '../translations/ar.yaml';
import bn from '../translations/bn.yaml';
import de from '../translations/de.yaml';
import en from '../translations/en.yaml';
import es from '../translations/es.yaml';
import fr from '../translations/fr.yaml';
import hi from '../translations/hi.yaml';
import ja from '../translations/ja.yaml';
import pt from '../translations/pt.yaml';
import ru from '../translations/ru.yaml';
import zh from '../translations/zh.yaml';

export default createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        ar: ar.ar,
        bn: bn.bn,
        de: de.de,
        en: en.en,
        es: es.es,
        fr: fr.fr,
        hi: hi.hi,
        ja: ja.ja,
        pt: pt.pt,
        ru: ru.ru,
        zh: zh.zh
    }
});