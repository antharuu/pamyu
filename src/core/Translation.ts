import {ITranslation} from "./interfaces/ITranslation";

// @ts-ignore
import trads from "../trad.yaml"
import {I18n} from "i18n-js";

export class Translation implements ITranslation {
    private static _instance: Translation;

    private i18n: I18n;

    static get i(): ITranslation {
        if (!Translation._instance) {
            Translation._instance = new Translation();
        }

        return Translation._instance;
    }

    constructor() {
        this.i18n = new I18n(trads);
    }

    setLanguage(language: string): ITranslation {
        this.i18n.locale = language;

        return this;
    }

    t(key: string): string {
        return this.translate(key);
    }

    translate(key: string): string {
        return this.i18n.t(key);
    }

}