import * as PIXI from "pixi.js";
import {Assets} from "./utils/Assets";
import getBackgroundsUrl = Assets.getBackgroundsUrl;
import {App} from "./App";
import {Sprite} from "pixi.js";

export class Scene {
    private _background: PIXI.Sprite;

    constructor(
        public id: string,
        backgroundName: string
    ) {
        console.log(`-------- Scene ${id} --------`);

        const imgPath = getBackgroundsUrl(backgroundName);

        this._background = new PIXI.Sprite(PIXI.Texture.from(imgPath));

        App.i.sceneManager.addScene(this);
    }

    get background(): Sprite {
        return this._background;
    }

}