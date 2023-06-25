import * as PIXI from "pixi.js";
import {App} from "./App";
import {Sprite} from "pixi.js";
import {SpriteType} from "../interfaces/IAssetManager";

export class Scene {
    private _background: PIXI.Sprite;

    constructor(
        public id: string,
        backgroundName: string
    ) {
        console.log(`-------- Scene ${id} --------`);

        this._background = App.i.assetManager.getSprite(backgroundName, SpriteType.Background);

        App.i.sceneManager.addScene(this);
    }

    get background(): Sprite {
        return this._background;
    }
}