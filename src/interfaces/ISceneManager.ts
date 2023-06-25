import {IScene} from "./IScene";

export interface  ISceneManager {
    scenes: Map<string, IScene>;

    get currentScene(): string;

    changeTo(name: string): ISceneManager;

    addScene(scene: IScene): void;

    addScenes(scenes: IScene[]): void;
}