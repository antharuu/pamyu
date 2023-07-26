import Pamyu from "../Pamyu";
export default class AssetManager {
    constructor() {
        this.assets = {};
    }
    registerAsset(key, path, assetType = "_") {
        const asset = { [key]: path };
        this.assets[assetType] = {
            ...asset,
            ...(this.assets[assetType] ?? {}),
        };
        return this;
    }
    registerAssets(newAssets, assetType) {
        for (const key in newAssets) {
            if (newAssets.hasOwnProperty(key)) {
                this.registerAsset(key, newAssets[key], assetType);
            }
        }
        return this;
    }
    registerBackgrounds(backgrounds) {
        this.registerAssets(backgrounds, "Background");
        return this;
    }
    registerCharacters(characters) {
        this.registerAssets(characters, "Characters");
        return this;
    }
    registerUI(ui) {
        this.registerAssets(ui, "UI");
        return this;
    }
    registerSide(side) {
        if (!Pamyu.config.sides.includes(side)) {
            Pamyu.config.sides.push(side);
        }
        return this;
    }
    getAsset(assetName, assetType = "_") {
        return this.assets[assetType]?.[assetName] || "";
    }
    getBackground(background) {
        return this.getAsset(background, "Background");
    }
    getCharacter(character) {
        return this.getAsset(character, "Characters");
    }
    getUI(ui) {
        return this.getAsset(ui, "UI");
    }
    async setBackground(background, ms = -1, fading = "ease-in-out") {
        const path = this.getBackground(background);
        if (ms >= 0) {
            Pamyu.container?.style.setProperty("transition", `background-image ${ms}ms ${fading}`);
        }
        Pamyu.container?.style.setProperty("background-image", `url(${path})`);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
}
//# sourceMappingURL=AssetManager.js.map