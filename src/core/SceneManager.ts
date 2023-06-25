import {Scene} from "./Scene";
import * as PIXI from "pixi.js";
import {App} from "./App";
import {ISceneManager} from "../interfaces/ISceneManager";

export class SceneManager implements ISceneManager {
    scenes: Map<string, Scene> = new Map<string, Scene>();

    private sceneContainer: PIXI.Container;

    constructor() {
        console.log("-------- SceneManager --------")
        this.sceneContainer = new PIXI.Container();
    }

    get currentScene(): string {
        throw new Error("Method not implemented.");
    }

    changeTo(name: string): ISceneManager {
        if (!this.scenes.has(name)) {
            throw new Error(`Scene with id ${name} doesn't exist!`);
        }

        console.log(`Setting scene to ${name}`);

        this.clearScene();

        const scene = this.scenes.get(name);

        if (!scene) {
            throw new Error(`Scene with id ${name} doesn't exist!`);
        }

        this.sceneContainer.addChild(scene.background);

        return this;
    }

    public addScene(scene: Scene): void {
        if (this.scenes.has(scene.id)) {
            throw new Error(`Scene with id ${scene.id} already exists!`);
        }

        this.scenes.set(scene.id, scene);
        App.i.pixi.stage.addChild(this.sceneContainer);
    }

    public addScenes(scenes: Scene[]): void {
        scenes.forEach(scene => this.addScene(scene));
    }

    public getScene(id: string): Scene | undefined {
        return this.scenes.get(id);
    }

    getSceneList() {
        return this.scenes.keys();
    }


    private clearScene() {
        this.sceneContainer.removeChildren();
    }
}