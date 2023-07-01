import { ITranslation } from "./interfaces/ITranslation";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import trads from "../trad.yaml";

import { Dict, I18n } from "i18n-js";

export class Translation implements ITranslation {
  private static _instance: Translation;

  private readonly i18n: I18n;

  public static get i(): ITranslation {
    Translation._instance = Translation._instance ?? new Translation();

    return Translation._instance;
  }

  public constructor() {
    this.i18n = new I18n(trads as Dict);
  }

  public setLanguage(language: string): ITranslation {
    this.i18n.locale = language;

    return this;
  }

  public t(key: string): string {
    return this.translate(key);
  }

  public translate(key: string): string {
    return this.i18n.t(key);
  }
}
