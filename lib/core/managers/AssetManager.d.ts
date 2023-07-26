import IAssetManager from "../interfaces/managers/IAssetManager";
import { AssetList } from "../types/app";
export default class AssetManager implements IAssetManager {
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
    setBackground(background: string, ms?: number, fading?: string): Promise<void>;
}
