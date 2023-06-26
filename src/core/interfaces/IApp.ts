import {IScene} from "./IScene";

export interface IApp {
    create(
        selector: string | HTMLElement,
        color?: string
    ): IApp;

    registerScenes(scenes: IScene[]): IApp;
}