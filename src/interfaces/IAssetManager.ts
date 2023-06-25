import * as PIXI from 'pixi.js';

export enum SpriteType {
    Undefined = 'undefined',
    Character = 'character',
    Background = 'backgrounds',
}
export interface IAssetManager {
    getAsset(path: string): string;

    getSprite(path: string, type?: SpriteType): PIXI.Sprite;

    getFont(path: string): string;
}