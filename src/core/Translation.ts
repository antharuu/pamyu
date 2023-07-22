import { ITranslation } from "./interfaces/ITranslation";

import { Dict, I18n } from "i18n-js";
import { Pamyu } from "./Pamyu";

export class Translation implements ITranslation {
  private static _instance: Translation;

  private readonly i18n: I18n | null = null;

  public static get i(): ITranslation {
    Translation._instance = Translation._instance ?? new Translation();

    return Translation._instance;
  }

  public constructor() {
    const translations = Pamyu.config.translation;
    const defaultTranslations = (translations as { [key: string]: unknown })
      .default;
    if (
      defaultTranslations === undefined ||
      defaultTranslations === null ||
      typeof defaultTranslations !== "object"
    ) {
      throw new Error(`Malformed translation file "default" is not an object.`);
    }

    this.i18n = new I18n(defaultTranslations as Dict);
  }

  public setLanguage(language: string): ITranslation {
    if (!this.i18n) {
      return this;
    }

    this.i18n.locale = language;

    return this;
  }

  public t(key: string): string {
    return this.translate(key);
  }

  public translate(key: string): string {
    if (!this.i18n) {
      return "[MISSING TRANSLATION FILE]";
    }

    return this.i18n.t(key);
  }
}
