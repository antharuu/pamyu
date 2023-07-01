export interface IAssetManager {
  getAssetPath(asset: string): string;

  getBackgroundPath(background: string): string;

  setBackground(
    background: string,
    ms?: number,
    fading?: string
  ): Promise<void>;

  setExpressionPatern(patern: string): IAssetManager;

  setExpressions(expressionsEnum: object): IAssetManager;
}
