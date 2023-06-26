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

    setBackground(background: string): boolean {
        const path = this.getBackgroundPath(background);
        console.log(path);
        App.i.container?.style.setProperty("background-image", `url(${path})`)
        return true;
    }
}