import { IScene } from "./IScene";
import { IAssetManager } from "./managers/IAssetManager";
import { AppOptions } from "../types/app";
import { IMessageManager } from "./managers/IMessageManager";
import { IConfig } from "./IConfig";

export interface IPamyu {
  container: HTMLElement | null;
  assetManager: IAssetManager;
  messageManager: IMessageManager;
  config: IConfig;

  configure(config: Partial<IConfig>): IPamyu;

  create(
    selector: string | HTMLElement,
    color?: string,
    options?: AppOptions
  ): IPamyu;

  registerScenes(scenes: IScene[]): IPamyu;

  prepare(elements: unknown[]): IPamyu;
}
