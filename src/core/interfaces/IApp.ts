import {IScene} from "./IScene";
import {IAssetManager} from "./managers/IAssetManager";

export interface IApp {
    container: HTMLElement | null;
    assetManager: IAssetManager;

    create(
        selector: string | HTMLElement,
        color?: string,
        options?: AppOptions
    ): IApp;

    registerScenes(scenes: IScene[]): IApp;
}