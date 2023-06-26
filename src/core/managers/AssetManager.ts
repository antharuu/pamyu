import {IAssetManager} from "../interfaces/managers/IAssetManager";
import {App} from "../App";

export class AssetManager implements IAssetManager {
    private readonly basePath: string = "assets";

    getAssetPath(asset: string, folder: string = ""): string {
        if (folder === "") return `${this.basePath}/${asset}`;
        return `${this.basePath}/${folder}/${asset}`;
    }

    getBackgroundPath(background: string): string {
        return this.getAssetPath(`${background}.png`, "backgrounds");
    }

    setBackground(background: string, ms: number = -1, fading: string = "ease-in-out"): void {
        const path = this.getBackgroundPath(background);
        if (ms >= 0) {
            App.i.container?.style.setProperty("transition", `background-image ${ms}ms ${fading}`)
        }
        App.i.container?.style.setProperty("background-image", `url(${path})`)
    }
}