import {IApp} from "./interfaces/IApp";
import {Translation} from "./Translation";
import {IScene} from "./interfaces/IScene";
import {IAssetManager} from "./interfaces/managers/IAssetManager";
import {AssetManager} from "./managers/AssetManager";

export class App implements IApp {
    private static _instance: IApp;

    private scenes: IScene[] = [];
    private currentScene: IScene | null = null;

    container: HTMLElement | null = null;

    assetManager: IAssetManager;

    private constructor() {
        this.assetManager = new AssetManager();
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


        Translation.i.setLanguage("fr");

        addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                this.getCurrentScene()
                    .execNext().then(({index, event}) => {
                    if (event === null) {
                        console.log("End of scene");
                    } else {
                        console.log("Next event", index, event);
                    }
                });
            }
        })

        return this;
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
}