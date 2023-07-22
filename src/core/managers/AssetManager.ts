import { Character } from "../Character";
import { IAssetManager } from "../interfaces/managers/IAssetManager";
import { Pamyu } from "../Pamyu";
import { AssetList, Assets } from "../types/app";

export class AssetManager implements IAssetManager {
  private expressionPattern = "";

  private expressions: object = {};

  private assets: Assets = {};

  public registerAsset(
    key: string,
    path: string,
    assetType = "_"
  ): IAssetManager {
    const asset: AssetList = { [key]: path };

    this.assets[assetType] = {
      ...asset,
      ...(this.assets[assetType] ?? {}),
    };

    return this;
  }

  public registerAssets(
    newAssets: AssetList,
    assetType?: string
  ): IAssetManager {
    for (const key in newAssets) {
      if (newAssets.hasOwnProperty(key)) {
        this.registerAsset(key, newAssets[key], assetType);
      }
    }

    return this;
  }

  public registerBackgrounds(backgrounds: AssetList): IAssetManager {
    this.registerAssets(backgrounds, "Background");

    return this;
  }

  public registerCharacters(characters: AssetList): IAssetManager {
    this.registerAssets(characters, "Characters");

    return this;
  }

  public registerUI(ui: AssetList): IAssetManager {
    this.registerAssets(ui, "UI");

    return this;
  }

  public registerSide(side: string): IAssetManager {
    if (!Pamyu.config.sides.includes(side)) {
      Pamyu.config.sides.push(side);
    }
    return this;
  }

  public getAsset(assetName: string, assetType = "_"): string {
    return this.assets[assetType]?.[assetName] || "";
  }

  public getBackground(background: string): string {
    return this.getAsset(background, "Background");
  }

  public getCharacter(character: string): string {
    return this.getAsset(character, "Characters");
  }

  public getUI(ui: string): string {
    return this.getAsset(ui, "UI");
  }

  public getExpressions(): string[] {
    return Object.keys(this.expressions);
  }

  public generateExpressionPath(
    character: string,
    params?: { [key: string]: string }
  ): string {
    const match = this.expressionPattern.match(/{[a-zA-Z0-9]+}/g) || [];
    let result = this.expressionPattern;

    for (const item of match) {
      const key = item.replace("{", "").replace("}", "");
      if (key === "character") {
        result = result.replace(item, character);
      } else if (params && Object.keys(params).includes(key)) {
        result = result.replace(item, params[key]);
      } else {
        throw new Error(`Value for "${key}" not supplied`);
      }
    }

    return result;
  }

  public async setBackground(
    background: string,
    ms = -1,
    fading = "ease-in-out"
  ): Promise<void> {
    const path = this.getBackground(background);
    if (ms >= 0) {
      Pamyu.container?.style.setProperty(
        "transition",
        `background-image ${ms}ms ${fading}`
      );
    }
    Pamyu.container?.style.setProperty("background-image", `url(${path})`);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  public registerExpressionPattern(pattern: string): IAssetManager {
    const matches = pattern.match(/{[a-zA-Z0-9]+}/g) || [];
    const allowedKeywords = ["character", "side", "expression"];

    for (const match of matches) {
      const keyword = match.slice(1, match.length - 1);
      if (!allowedKeywords.includes(keyword)) {
        throw new Error(
          `Invalid keyword "${keyword}", allowed keywords are ${allowedKeywords.join(
            ", "
          )}.`
        );
      }
    }

    this.expressionPattern = pattern;

    return this;
  }

  public registerExpressions(character: Character): IAssetManager {
    if (Pamyu.config.sides.length === 0) {
      Pamyu.config.sides.push("");
    }
    const unFetchedExpressions: string[] = [];
    character.allowedExpressions.forEach((expression: string) => {
      Pamyu.config.sides.forEach((side: string) => {
        import(
          /* @vite-ignore */
          "../../assets/" +
            this.generateExpressionPath(character.name, { side, expression })
        )
          .then(({ default: r }: { default: string }) => {
            if (r.startsWith("/@fs/")) {
              unFetchedExpressions.push(expression);
              return;
            } else {
              this.registerAsset(
                `${character.name}_${side}_${expression}`,
                r,
                "expressions"
              );
            }
          })
          .catch(() => unFetchedExpressions.push(expression));
      });
    });

    if (unFetchedExpressions.length !== 0) {
      console.warn(
        `Failed to fetch assets for Character ${
          character.name
        } with expressions: ${unFetchedExpressions.join(", ")}`
      );
    }

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
    const pattern = this.expressionPattern
      .replace("{character}", character)
      .replace("{side}", side)
      .replace("{expression}", expression);

    return this.getAsset(pattern, "expressions");
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
