export default interface ITranslation {
  setLanguage(language: string): ITranslation;

  translate(key: string): string;

  t(key: string): string;
}
