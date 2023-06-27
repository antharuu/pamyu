import {IScene} from "./IScene";
import {IAssetManager} from "./managers/IAssetManager";
import {AppOptions} from "../types/app";
import {IMessageManager} from "./managers/IMessageManager";

export interface IApp {
    container: HTMLElement | null;
    assetManager: IAssetManager;
    messageManager: IMessageManager;

    create(
        selector: string | HTMLElement,
        color?: string,
        options?: AppOptions
    ): IApp;

    registerScenes(scenes: IScene[]): IApp;
}