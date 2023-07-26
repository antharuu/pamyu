import ITranslation from "./interfaces/ITranslation";
export declare class Translation implements ITranslation {
    static useTranslation: boolean;
    private static _instance;
    private readonly i18n;
    static get i(): ITranslation;
    constructor();
    setLanguage(language: string): ITranslation;
    t(key: string): string;
    translate(key: string): string;
    private initI18n;
}
