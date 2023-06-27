import {Translation} from "./Translation";
import {IScene} from "./interfaces/IScene";
import {IAssetManager} from "./interfaces/managers/IAssetManager";
import {AssetManager} from "./managers/AssetManager";
import {IApp} from "./interfaces/IApp";
import {AppOptions} from "./types/app";
import {MessageManager} from "./managers/MessageManager";
import {IMessageManager} from "./interfaces/managers/IMessageManager";

export class App implements IApp {
    private static _instance: IApp;

    private scenes: IScene[] = [];
    private currentScene: IScene | null = null;

    container: HTMLElement | null = null;

    assetManager: IAssetManager;
    messageManager: IMessageManager;

    canContinue: boolean = true;

    private constructor() {
        this.assetManager = new AssetManager();
        this.messageManager = new MessageManager();
    }

    static get i(): IApp {
        if (App._instance === undefined) {
            App._instance = new App();
        }

        return App._instance;
    }

    create(
        selector: string | HTMLElement,
        color: string = "black",
        options: AppOptions = {}
    ): IApp {
        if (typeof selector === "string") {
            const element = document.querySelector<HTMLElement>(selector);

            if (element === null) {
                throw new Error(`Element with selector ${selector} not found.`);
            }

            this.container = element

        } else this.container = selector;

        if (options) {
            if ("background" in options && options.background !== undefined) {
                this.assetManager.setBackground(options.background)
            }
        }

        this.container.style.setProperty('--background-color', color)

        this.initHtmlElements();

        Translation.i.setLanguage("fr");

        addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter" && this.canContinue) {
                this.canContinue = false;
                this.next().then(() => this.canContinue = true);
            }
        })

        return this;
    }

    private async next() {
        const {continueTimeline} = await this.getCurrentScene().execNext();
        if (continueTimeline) this.next().then(r => r);
    }

    registerScenes(scenes: IScene[]): IApp {
        if (this.container === null) throw new Error("You must create the app before registering scenes");
        this.scenes = scenes || [];

        return this;
    }

    private getCurrentScene() {
        if (this.currentScene === null) {
            this.currentScene = this.scenes[0];
        }

        return this.currentScene;
    }

    private initHtmlElements() {
        const elements: HTMLElement[] = []

        const msgBox = document.createElement("div");
        msgBox.id = "message-box";
        msgBox.style.setProperty(
            "--msg-box-background-image",
            `url(${this.assetManager.getAssetPath("ui/msg-box.png")})`
        )
        elements.push(msgBox);

        const textBox = document.createElement("div");
        textBox.id = "text-box";
        msgBox.appendChild(textBox);

        elements.forEach(element => this.container?.appendChild(element))

        this.messageManager = new MessageManager();
    }
}