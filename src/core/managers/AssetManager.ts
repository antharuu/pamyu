import {IAssetManager} from "../interfaces/managers/IAssetManager";
import {App} from "../App";

export class AssetManager implements IAssetManager {
    private readonly basePath: string = "assets";

    private expressionPatern: string = "";

    private expressions: object = {};

    getAssetPath(asset: string, folder: string = ""): string {
        if (folder === "") return `${this.basePath}/${asset}`;
        return `${this.basePath}/${folder}/${asset}`;
    }

    getBackgroundPath(background: string): string {
        return this.getAssetPath(`${background}.png`, "backgrounds");
    }

    setBackground(background: string, ms: number = -1, fading: string = "ease-in-out"): Promise<void> {
        const path = this.getBackgroundPath(background);
        if (ms >= 0) {
            App.i.container?.style.setProperty("transition", `background-image ${ms}ms ${fading}`)
        }
        App.i.container?.style.setProperty("background-image", `url(${path})`)

        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        });
    }

    /***
     * You can use the following words in the pattern:
     * - *{character}* - character name
     * - *{side}* - left or right
     * - *{expression}* - expression name
     *
     * @param patern
     **/
    setExpressionPatern(patern: string): IAssetManager {
        this.expressionPatern = patern;

        return this;
    }

    setExpressions(expressionsEnum: object): IAssetManager {
        this.expressions = expressionsEnum;

        return this;
    }

    getExpressionPath(character: string, side: string, expression: string): string {
        const patern = this.expressionPatern
            .replace("{character}", character)
            .replace("{side}", side)
            .replace("{expression}", expression);

        return this.getAssetPath(patern, "expressions");
    }

    getExpression(character: string, side: string, expression: string): string | null {
        if (!this.expressions.hasOwnProperty(expression)) return null;

        return this.getExpressionPath(character, side, expression);
    }
}