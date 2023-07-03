import { IAssetManager } from "../interfaces/managers/IAssetManager";
import { Pamyu } from "../Pamyu";

export class AssetManager implements IAssetManager {
  private readonly basePath: string = "assets";

  private expressionPatern = "";

  private expressions: object = {};

  public getAssetPath(asset: string, folder = ""): string {
    if (folder === "") return `${this.basePath}/${asset}`;
    return `${this.basePath}/${folder}/${asset}`;
  }

  public getBackgroundPath(background: string): string {
    return this.getAssetPath(`${background}.png`, "backgrounds");
  }

  public setBackground(
    background: string,
    ms = -1,
    fading = "ease-in-out"
  ): Promise<void> {
    const path = this.getBackgroundPath(background);
    if (ms >= 0) {
      Pamyu.i.container?.style.setProperty(
        "transition",
        `background-image ${ms}ms ${fading}`
      );
    }
    Pamyu.i.container?.style.setProperty("background-image", `url(${path})`);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  /***
   * You can use the following words in the pattern:
   * - *{character}* - character name
   * - *{side}* - left or right
   * - *{expression}* - expression name
   *
   * @param pattern
   **/
  public setExpressionPattern(pattern: string): IAssetManager {
    this.expressionPatern = pattern;

    return this;
  }

  public setExpressions(expressionsEnum: object): IAssetManager {
    this.expressions = expressionsEnum;

    return this;
  }

  public getExpressionPath(
    character: string,
    side: string,
    expression: string
  ): string {
    const patern = this.expressionPatern
      .replace("{character}", character)
      .replace("{side}", side)
      .replace("{expression}", expression);

    return this.getAssetPath(patern, "expressions");
  }

  public getExpression(
    character: string,
    side: string,
    expression: string
  ): string | null {
    if (!this.expressions.hasOwnProperty(expression)) return null;

    return this.getExpressionPath(character, side, expression);
  }
}
