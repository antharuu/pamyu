import { I18n } from "i18n-js";
import Pamyu from "./Pamyu";
export class Translation {
    static get i() {
        Translation._instance = Translation._instance ?? new Translation();
        return Translation._instance;
    }
    constructor() {
        this.i18n = null;
        const translations = Pamyu.config.translation;
        if (translations === null ||
            translations === undefined ||
            typeof translations !== "object" ||
            Object.keys(translations).length === 0) {
            return;
        }
        if (!("default" in translations)) {
            throw new Error(`Malformed translation file "default" is a reserved keyword.`);
        }
        this.i18n = this.initI18n(translations.default);
        Translation.useTranslation = true;
    }
    setLanguage(language) {
        if (!this.i18n) {
            return this;
        }
        this.i18n.locale = language;
        return this;
    }
    t(key) {
        return this.translate(key);
    }
    translate(key) {
        if (!this.i18n) {
            return "[MISSING TRANSLATION FILE]";
        }
        return this.i18n.t(key);
    }
    initI18n(defaultTranslations) {
        if (defaultTranslations === undefined ||
            defaultTranslations === null ||
            typeof defaultTranslations !== "object") {
            throw new Error(`Malformed translation file "default" is not an object.`);
        }
        return new I18n(defaultTranslations);
    }
}
Translation.useTranslation = false;
//# sourceMappingURL=Translation.js.map