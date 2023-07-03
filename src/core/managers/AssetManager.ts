import { IAssetManager } from "../interfaces/managers/IAssetManager";
import { Pamyu } from "../Pamyu";

export class AssetManager implements IAssetManager {
  private readonly basePath: string = "assets";

  private expressionPattern = "";

  private expressions: object = {};

  // Returns the path to a particular asset, with an optional folder
  public getAssetPath(asset: string, folder = "/"): string {
    return `${this.basePath}${folder}${asset}`;
  }

  // Returns the path to a specific background image
  public getBackgroundPath(background: string): string {
    return this.getAssetPath(`${background}.png`, "/backgrounds/");
  }

  /**
   * Sets the background image with an optional transition
   * @param background The background to be set
   * @param ms Transition duration in milliseconds
   * @param fading Transition type
   */
  public setBackground(
    background: string,
    ms = -1,
    fading = "ease-in-out"
  ): Promise<void> {
    const path = this.getBackgroundPath(background);
    Pamyu.i.container?.style.setProperty(
      "transition",
      `background-image ${ms}ms ${fading}`
    );
    Pamyu.i.container?.style.setProperty("background-image", `url(${path})`);

    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }

  // Defines a pattern for fetching expressions
  public setExpressionPattern(pattern: string): IAssetManager {
    this.expressionPattern = pattern;
    return this;
  }

  // Sets the map of available expressions
  public setExpressions(expressionsEnum: object): IAssetManager {
    this.expressions = expressionsEnum;
    return this;
  }

  // Returns the path to a specific expression
  public getExpressionPath(
    character: string,
    side: string,
    expression: string
  ): string {
    const pattern = this.expressionPattern
      .replace("{character}", character)
      .replace("{side}", side)
      .replace("{expression}", expression);

    return this.getAssetPath(pattern, "/expressions/");
  }

  // Returns the path to a specific expression if it's available, otherwise returns null.
  public getExpression(
    character: string,
    side: string,
    expression: string
  ): string | null {
    return this.expressions.hasOwnProperty(expression)
      ? this.getExpressionPath(character, side, expression)
      : null;
  }
}
