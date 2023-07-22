import { I18n } from "i18n-js";
import { Pamyu } from "./Pamyu";
export class Translation {
    static get i() {
        var _a;
        Translation._instance = (_a = Translation._instance) !== null && _a !== void 0 ? _a : new Translation();
        return Translation._instance;
    }
    constructor() {
        this.i18n = null;
        const file = Pamyu.config.translationFile;
        if (!file) {
            return;
        }
        void import(file).then((trads) => {
            if (trads === undefined ||
                trads === null ||
                typeof trads !== "object" ||
                !("default" in trads)) {
                throw new Error(`Missing translation file: "${file}"`);
            }
            const defaultTrads = trads.default;
            if (defaultTrads === undefined ||
                defaultTrads === null ||
                typeof defaultTrads !== "object") {
                throw new Error(`Malformed translation file: "${file}". "default" is not an object.`);
            }
            const defaultLanguage = defaultTrads[Translation.DEFAULT_LANGUAGE];
            if (defaultLanguage === undefined ||
                defaultLanguage === null ||
                typeof defaultLanguage !== "object") {
                throw new Error(`Malformed translation file: "${file}". Missing default language.`);
            }
            this.i18n = new I18n(trads);
        });
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
}
Translation.DEFAULT_LANGUAGE = "fr";
//# sourceMappingURL=Translation.js.map