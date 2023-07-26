import { Translation } from "./Translation";
import { Config } from "./Config";
import MessageManager from "./managers/MessageManager";
import SaveManager from "./managers/SaveManager";
import AssetManager from "./managers/AssetManager";
import CharacterManager from "./managers/CharacterManager";
class PamyuCore {
    constructor() {
        this.container = null;
        this.scenes = [];
        this.currentScene = null;
        this.canContinue = true;
        this.config = new Config({});
        console.info("Pamyu version: ", this.config.pamyuVersion);
        console.warn("Pamyu is in development version, use at your own risk.");
        this.assetManager = new AssetManager();
        this.messageManager = new MessageManager();
        this.saveManager = new SaveManager("0.0.1");
        this.characterManager = new CharacterManager();
    }
    static get i() {
        if (PamyuCore._instance === undefined) {
            PamyuCore._instance = new PamyuCore();
        }
        return PamyuCore._instance;
    }
    configure(config) {
        this.config = {
            ...this.config,
            ...config,
        };
        return this;
    }
    create(selector, color = "black", options = {}) {
        if (this.config.pamyuDevEnv) {
            console.warn("Pamyu is in developer mode, styles will be imported in scss.");
        }
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
        this.container.classList.add("pamyu__app");
        this.container.style.setProperty("--background-color", color);
        void this.importStyles();
        this.initHtmlElements();
        Translation.i.setLanguage("fr");
        addEventListener("keydown", (event) => {
            if (event.key === "Enter" && this.canContinue) {
                this.canContinue = false;
                void this.next().then(() => (this.canContinue = true));
            }
        });
        this.characterManager.createPlacements();
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
    async next() {
        const { continueTimeline } = await this.getCurrentScene().execNext();
        if (continueTimeline)
            void this.next();
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
        elements.forEach((element) => this.container?.appendChild(element));
        this.messageManager = new MessageManager();
    }
    createMessageBox() {
        const msgBox = document.createElement("div");
        msgBox.classList.add("pamyu__message-box");
        msgBox.style.setProperty("--msg-box-background-image", `url(${this.assetManager.getAsset("MsgBox", "UI")})`);
        return msgBox;
    }
    createTextBox() {
        const textBox = document.createElement("div");
        textBox.classList.add("pamyu__text-box");
        return textBox;
    }
    async importStyles() {
        if (!this.config.importBaseStyles)
            return;
        const src = this.config.pamyuDevEnv ? "src" : "node_modules/pamyu/lib";
        for (const ext of ["css", "scss"]) {
            const response = await fetch(`${src}/styles/global.${ext}`);
            if (response.ok) {
                import(`../styles/global.${ext}`);
                // TODO: Fix the ?inline thing
                return;
            }
        }
        console.error("Could not find styles for Pamyu");
    }
}
export default PamyuCore.i;
//# sourceMappingURL=Pamyu.js.map