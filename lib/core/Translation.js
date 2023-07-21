// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import trads from "../../examples/trad.yaml";
import { I18n } from "i18n-js";
export class Translation {
    static get i() {
        var _a;
        Translation._instance = (_a = Translation._instance) !== null && _a !== void 0 ? _a : new Translation();
        return Translation._instance;
    }
    constructor() {
        this.i18n = new I18n(trads);
    }
    setLanguage(language) {
        this.i18n.locale = language;
        return this;
    }
    t(key) {
        return this.translate(key);
    }
    translate(key) {
        return this.i18n.t(key);
    }
}
