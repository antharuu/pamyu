import {Scene} from "./Scene";
import * as PIXI from "pixi.js";
import {App} from "./App";

export class SceneManager {
    public static scenes: Map<string, Scene> = new Map<string, Scene>();

    private sceneContainer: PIXI.Container;

    constructor() {
        console.log("-------- SceneManager --------")
        this.sceneContainer = new PIXI.Container();
    }

    public addScene(scene: Scene): void {
        if (SceneManager.scenes.has(scene.id)) {
            throw new Error(`Scene with id ${scene.id} already exists!`);
        }

        SceneManager.scenes.set(scene.id, scene);
        App.i.getApp().stage.addChild(this.sceneContainer);
    }

    public getScene(id: string): Scene | undefined {
        return SceneManager.scenes.get(id);
    }

    getSceneList() {
        return SceneManager.scenes.keys();
    }

    setScene(test: string) {
        if(!SceneManager.scenes.has(test)) {
            throw new Error(`Scene with id ${test} doesn't exist!`);
        }

        console.log(`Setting scene to ${test}`);

        this.clearScene();

        const scene = SceneManager.scenes.get(test);

        if(!scene) {
            throw new Error(`Scene with id ${test} doesn't exist!`);
        }

        console.log(scene.background)

        this.sceneContainer.addChild(scene.background);
    }

    private clearScene() {
        this.sceneContainer.removeChildren();
    }
}