import { Translation } from "./Translation";
import { IScene } from "./interfaces/IScene";
import { IAssetManager } from "./interfaces/managers/IAssetManager";
import { AssetManager } from "./managers/AssetManager";
import { IPamyu } from "./interfaces/IPamyu";
import { AppOptions } from "./types/app";
import { MessageManager } from "./managers/MessageManager";
import { IMessageManager } from "./interfaces/managers/IMessageManager";
import { IConfig } from "./interfaces/IConfig";
import { Config } from "./Config";
import ISaveManager from "./interfaces/managers/ISaveManager";
import SaveManager from "./managers/SaveManager";

class PamyuCore implements IPamyu {
  private static _instance: IPamyu;

  public container: HTMLElement | null = null;

  public assetManager: IAssetManager;

  public messageManager: IMessageManager;

  public saveManager: ISaveManager;

  public config: IConfig;

  private scenes: IScene[] = [];

  private currentScene: IScene | null = null;

  private canContinue = true;

  private constructor() {
    this.config = new Config({});
    console.info("Pamyu version: ", this.config.pamyuVersion);
    console.warn("Pamyu is in development version, use at your own risk.");
    this.assetManager = new AssetManager();
    this.messageManager = new MessageManager();
    this.saveManager = new SaveManager("0.0.1");
  }

  public static get i(): IPamyu {
    if (PamyuCore._instance === undefined) {
      PamyuCore._instance = new PamyuCore();
    }

    return PamyuCore._instance;
  }

  public configure(config: Partial<IConfig>): IPamyu {
    this.config = {
      ...this.config,
      ...config,
    };

    return this;
  }

  public create(
    selector: string | HTMLElement,
    color = "black",
    options: AppOptions = {}
  ): IPamyu {
    if (this.config.pamyuDevEnv) {
      console.warn(
        "Pamyu is in developer mode, styles will be imported in scss."
      );
    }

    if (typeof selector === "string") {
      const element = document.querySelector<HTMLElement>(selector);

      if (element === null) {
        console.error(`Element with selector ${selector} not found.`);
      }

      this.container = element;
    } else this.container = selector;

    if (options.hasOwnProperty("background")) {
      if ("background" in options && options.background !== undefined) {
        void this.assetManager.setBackground(options.background);
      }
    }

    if (this.container === null) throw new Error("Container is null");
    this.container.classList.add("pamyu__app");
    this.container.style.setProperty("--background-color", color);

    void this.importStyles();
    this.initHtmlElements();

    Translation.i.setLanguage("fr");

    addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter" && this.canContinue) {
        this.canContinue = false;
        void this.next().then(() => (this.canContinue = true));
      }
    });

    return this;
  }

  public registerScenes(scenes?: IScene[]): IPamyu {
    if (this.container === null)
      console.error("You must create the app before registering scenes");
    this.scenes = scenes || [];

    return this;
  }

  public prepare(elements: unknown[]): IPamyu {
    const max = elements.length;
    elements.forEach((_, i) => {
      if (i === max - 1) console.info("Loading complete");
      else {
        const percent = Math.round(((i + 1) / max) * 100);
        console.info(`Loading ${percent}%`);
      }
    });

    return this;
  }

  private async next(): Promise<void> {
    const { continueTimeline } = await this.getCurrentScene().execNext();
    if (continueTimeline) void this.next();
  }

  private getCurrentScene(): IScene {
    if (this.currentScene === null) {
      this.currentScene = this.scenes[0];
    }

    return this.currentScene;
  }

  private initHtmlElements(): void {
    const elements: HTMLElement[] = [];
    const msgBox = this.createMessageBox();
    elements.push(msgBox);
    const textBox = this.createTextBox();
    msgBox.appendChild(textBox);
    elements.forEach((element) => this.container?.appendChild(element));
    this.messageManager = new MessageManager();
  }

  private createMessageBox(): HTMLDivElement {
    const msgBox = document.createElement("div");
    msgBox.classList.add("pamyu__message-box");
    msgBox.style.setProperty(
      "--msg-box-background-image",
      `url(${this.assetManager.getAsset("MsgBox", "UI")})`
    );
    return msgBox;
  }

  private createTextBox(): HTMLDivElement {
    const textBox = document.createElement("div");
    textBox.classList.add("pamyu__text-box");
    return textBox;
  }

  private async importStyles(): Promise<void> {
    if (!this.config.importBaseStyles) return;
    let found = false;
    const src = this.config.pamyuDevEnv ? "src" : "node_modules/pamyu/lib";
    for (const ext of ["css", "scss"]) {
      const response = await fetch(`${src}/styles/global.${ext}`);
      if (response.ok) {
        import(`../styles/global.${ext}`);
        found = true;
        return;
      }
    }

    if (!found) {
      console.error("Could not find styles for Pamyu");
    }
  }
}

export const Pamyu = PamyuCore.i;
