import { ITranslation } from "./interfaces/ITranslation";
export declare class Translation implements ITranslation {
    static readonly DEFAULT_LANGUAGE: string;
    private static _instance;
    private i18n;
    static get i(): ITranslation;
    constructor();
    setLanguage(language: string): ITranslation;
    t(key: string): string;
    translate(key: string): string;
}
