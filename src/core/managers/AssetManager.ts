import IAssetManager from "../interfaces/managers/IAssetManager";
import Pamyu from "../Pamyu";
import { AssetList, Assets } from "../types/app";

export default class AssetManager implements IAssetManager {
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
}
