export namespace Assets {
    export function getAssetUrl(assetName: string): string{
        return `assets/${assetName}`;
    }

    export function getImagesUrl(assetName: string, extension: string = "png"): string {
        return getAssetUrl(`${assetName}.${extension}`);
    }

    export function getBackgroundsUrl(assetName: string, extension: string = "png"): string {
        return getAssetUrl(`backgrounds/${assetName}.${extension}`);
    }
}