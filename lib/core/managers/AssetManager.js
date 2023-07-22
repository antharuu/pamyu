var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Pamyu from "../Pamyu";
export class AssetManager {
    constructor() {
        this.expressionPatern = "";
        this.expressionSides = ["left", "right"];
        this.expressions = {};
        this.assets = {};
    }
    registerAsset(key, path, assetType = "_") {
        var _a;
        const asset = { [key]: path };
        this.assets[assetType] = Object.assign(Object.assign({}, asset), ((_a = this.assets[assetType]) !== null && _a !== void 0 ? _a : {}));
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
        if (!this.expressionSides.includes(side)) {
            this.expressionSides.push(side);
        }
        return this;
    }
    getAsset(assetName, assetType = "_") {
        var _a;
        return ((_a = this.assets[assetType]) === null || _a === void 0 ? void 0 : _a[assetName]) || "";
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
        const match = this.expressionPatern.match(/{[a-zA-Z0-9]+}/g) || [];
        let result = this.expressionPatern;
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
    setBackground(background, ms = -1, fading = "ease-in-out") {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const path = this.getBackground(background);
            if (ms >= 0) {
                (_a = Pamyu.container) === null || _a === void 0 ? void 0 : _a.style.setProperty("transition", `background-image ${ms}ms ${fading}`);
            }
            (_b = Pamyu.container) === null || _b === void 0 ? void 0 : _b.style.setProperty("background-image", `url(${path})`);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, ms);
            });
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
        this.expressionPatern = pattern;
        return this;
    }
    registerExpressions(character) {
        if (this.expressionSides.length === 0) {
            this.expressionSides.push("");
        }
        const unFetchedExpressions = [];
        character.allowedExpressions.forEach((expression) => {
            this.expressionSides.forEach((side) => {
                import("../../assets/" +
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
        console.log(unFetchedExpressions);
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
        const patern = this.expressionPatern
            .replace("{character}", character)
            .replace("{side}", side)
            .replace("{expression}", expression);
        return this.getAsset(patern, "expressions");
    }
    getExpression(character, side, expression) {
        if (!this.expressions.hasOwnProperty(expression))
            return null;
        return this.getExpressionPath(character, side, expression);
    }
}
