var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Translation } from "./Translation";
import { AssetManager } from "./managers/AssetManager";
import { MessageManager } from "./managers/MessageManager";
import { Config } from "./Config";
import SaveManager from "./managers/SaveManager";
class PamyuCore {
    constructor() {
        this.container = null;
        this.scenes = [];
        this.currentScene = null;
        this.canContinue = true;
        this.config = new Config({});
        this.assetManager = new AssetManager();
        this.messageManager = new MessageManager();
        this.saveManager = new SaveManager("0.0.1");
    }
    static get i() {
        if (PamyuCore._instance === undefined) {
            PamyuCore._instance = new PamyuCore();
        }
        return PamyuCore._instance;
    }
    configure(config) {
        this.config = Object.assign(Object.assign({}, this.config), config);
        return this;
    }
    create(selector, color = "black", options = {}) {
        if (typeof selector === "string") {
            const element = document.querySelector(selector);
            if (element === null) {
                console.error(`Element with selector ${selector} not found.`);
            }
            this.container = element;
        }
        else
            this.container = selector;
        if (options.hasOwnProperty("background")) {
            if ("background" in options && options.background !== undefined) {
                void this.assetManager.setBackground(options.background);
            }
        }
        if (this.container === null)
            throw new Error("Container is null");
        this.container.style.setProperty("--background-color", color);
        this.initHtmlElements();
        Translation.i.setLanguage("fr");
        addEventListener("keydown", (event) => {
            if (event.key === "Enter" && this.canContinue) {
                this.canContinue = false;
                void this.next().then(() => (this.canContinue = true));
            }
        });
        return this;
    }
    registerScenes(scenes) {
        if (this.container === null)
            console.error("You must create the app before registering scenes");
        this.scenes = scenes || [];
        return this;
    }
    prepare(elements) {
        const max = elements.length;
        elements.forEach((_, i) => {
            if (i === max - 1)
                console.info("Loading complete");
            else {
                const percent = Math.round(((i + 1) / max) * 100);
                console.info(`Loading ${percent}%`);
            }
        });
        return this;
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            const { continueTimeline } = yield this.getCurrentScene().execNext();
            if (continueTimeline)
                void this.next();
        });
    }
    getCurrentScene() {
        if (this.currentScene === null) {
            this.currentScene = this.scenes[0];
        }
        return this.currentScene;
    }
    initHtmlElements() {
        const elements = [];
        const msgBox = this.createMessageBox();
        elements.push(msgBox);
        const textBox = this.createTextBox();
        msgBox.appendChild(textBox);
        elements.forEach((element) => { var _a; return (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(element); });
        this.messageManager = new MessageManager();
    }
    createMessageBox() {
        const msgBox = document.createElement("div");
        msgBox.id = "message-box";
        msgBox.style.setProperty("--msg-box-background-image", `url(${this.assetManager.getAsset("MsgBox", "UI")})`);
        return msgBox;
    }
    createTextBox() {
        const textBox = document.createElement("div");
        textBox.id = "text-box";
        return textBox;
    }
}
export const Pamyu = PamyuCore.i;
//# sourceMappingURL=Pamyu.js.map