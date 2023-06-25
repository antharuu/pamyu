import {IApplicationOptions} from "pixi.js";
import {ISceneManager} from "./ISceneManager";
import {IDialogManager} from "./IDialogManager";
import {ICharacterManager} from "./ICharacterManager";
import {IAssetManager} from "./IAssetManager";
import {IVariableManager} from "./IVariableManager";

export interface IApp {
    get sceneManager(): ISceneManager;

    get dialogManager(): IDialogManager;

    get characterManager(): ICharacterManager;

    get assetManager(): IAssetManager;

    get variableManager(): IVariableManager;

    create(width: number, height: number, options?: Partial<IApplicationOptions>): IApp;

    bindTo(element: string): IApp;
}