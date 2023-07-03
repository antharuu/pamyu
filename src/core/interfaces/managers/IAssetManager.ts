export interface IAssetManager {
  getAssetPath(asset: string): string;

  getBackgroundPath(background: string): string;

  setBackground(
    background: string,
    ms?: number,
    fading?: string
  ): Promise<void>;

  /***
   * You can use the following words in the pattern:
   * - *{character}* - character name
   * - *{side}* - left or right
   * - *{expression}* - expression name
   *
   * @param pattern
   **/
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
