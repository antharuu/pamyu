import { Character } from "../Character";
import { IAssetManager } from "../interfaces/managers/IAssetManager";
import { AssetList } from "../types/app";
export declare class AssetManager implements IAssetManager {
    private expressionPattern;
    private expressions;
    private assets;
    registerAsset(key: string, path: string, assetType?: string): IAssetManager;
    registerAssets(newAssets: AssetList, assetType?: string): IAssetManager;
    registerBackgrounds(backgrounds: AssetList): IAssetManager;
    registerCharacters(characters: AssetList): IAssetManager;
    registerUI(ui: AssetList): IAssetManager;
    registerSide(side: string): IAssetManager;
    getAsset(assetName: string, assetType?: string): string;
    getBackground(background: string): string;
    getCharacter(character: string): string;
    getUI(ui: string): string;
    getExpressions(): string[];
    generateExpressionPath(character: string, params?: {
        [key: string]: string;
    }): string;
    setBackground(background: string, ms?: number, fading?: string): Promise<void>;
    registerExpressionPattern(pattern: string): IAssetManager;
    registerExpressions(character: Character): IAssetManager;
    setExpressions(expressionsEnum: object): IAssetManager;
    getExpressionPath(character: string, side: string, expression: string): string;
    getExpression(character: string, side: string, expression: string): string | null;
}
