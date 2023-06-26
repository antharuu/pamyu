export interface IAssetManager {
    getAssetPath(asset: string): string;

    getBackgroundPath(background: string): string;

    setBackground(background: string): boolean;
}