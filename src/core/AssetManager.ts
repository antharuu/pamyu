import {IAssetManager, SpriteType} from "../interfaces/IAssetManager";
import {Sprite} from "pixi.js";

export class AssetManager implements IAssetManager {
    getAsset(path: string): string {
        return `assets/${path}`;
    }

    getFont(path: string): string {
        return `assets/fonts/${path}`;
    }

    getSprite(path: string, type?: SpriteType): Sprite {
        const fullPath = this.getAsset(`${type}/${path}.png`);

        return Sprite.from(fullPath);
    }

}