import Pamyu from "../Pamyu";
export default class AssetManager {
    constructor() {
        this.expressionPattern = "";
        this.expressions = {};
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
    getExpressions() {
        return Object.keys(this.expressions);
    }
    generateExpressionPath(character, params) {
        const match = this.expressionPattern.match(/{[a-zA-Z0-9]+}/g) || [];
        let result = this.expressionPattern;
        for (const item of match) {
            const key = item.replace("{", "").replace("}", "");
            if (key === "character") {
                result = result.replace(item, character);
            }
            else if (params && Object.keys(params).includes(key)) {
                result = result.replace(item, params[key]);
            }
            else {
                throw new Error(`Value for "${key}" not supplied`);
            }
        }
        return result;
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
    registerExpressionPattern(pattern) {
        const matches = pattern.match(/{[a-zA-Z0-9]+}/g) || [];
        const allowedKeywords = ["character", "side", "expression"];
        for (const match of matches) {
            const keyword = match.slice(1, match.length - 1);
            if (!allowedKeywords.includes(keyword)) {
                throw new Error(`Invalid keyword "${keyword}", allowed keywords are ${allowedKeywords.join(", ")}.`);
            }
        }
        this.expressionPattern = pattern;
        return this;
    }
    registerExpressions(character) {
        if (Pamyu.config.sides.length === 0) {
            Pamyu.config.sides.push("");
        }
        const unFetchedExpressions = [];
        character.allowedExpressions.forEach((expression) => {
            Pamyu.config.sides.forEach((side) => {
                import(
                /* @vite-ignore */
                "../../assets/" +
                    this.generateExpressionPath(character.name, { side, expression }))
                    .then(({ default: r }) => {
                    if (r.startsWith("/@fs/")) {
                        unFetchedExpressions.push(expression);
                        return;
                    }
                    else {
                        this.registerAsset(`${character.name}_${side}_${expression}`, r, "expressions");
                    }
                })
                    .catch(() => unFetchedExpressions.push(expression));
            });
        });
        if (unFetchedExpressions.length !== 0) {
            console.warn(`Failed to fetch assets for Character ${character.name} with expressions: ${unFetchedExpressions.join(", ")}`);
        }
        return this;
    }
    setExpressions(expressionsEnum) {
        this.expressions = expressionsEnum;
        return this;
    }
    getExpressionPath(character, side, expression) {
        const pattern = this.expressionPattern
            .replace("{character}", character)
            .replace("{side}", side)
            .replace("{expression}", expression);
        return this.getAsset(pattern, "expressions");
    }
    getExpression(character, side, expression) {
        if (!this.expressions.hasOwnProperty(expression))
            return null;
        return this.getExpressionPath(character, side, expression);
    }
}
//# sourceMappingURL=AssetManager.js.map