export interface IAssetManager {
  getAssetPath(asset: string): string;

  getBackgroundPath(background: string): string;

  setBackground(
    background: string,
    ms?: number,
    fading?: string
  ): Promise<void>;

  setExpressionPattern(pattern: string): IAssetManager;

  setExpressions(expressionsEnum: object): IAssetManager;

  getExpressionPath(
    character: string,
    side: string,
    expression: string
  ): string;

  getExpression(
    character: string,
    side: string,
    expression: string
  ): string | null;
}
