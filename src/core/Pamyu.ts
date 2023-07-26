import { Translation } from "./Translation";
import { IScene } from "./interfaces/IScene";
import { IPamyu } from "./interfaces/IPamyu";
import { AppOptions } from "./types/app";
import { Config } from "./Config";
import IConfig from "./interfaces/IConfig";
import MessageManager from "./managers/MessageManager";
import ISaveManager from "./interfaces/managers/ISaveManager";
import IAssetManager from "./interfaces/managers/IAssetManager";
import IMessageManager from "./interfaces/managers/IMessageManager";
import ICharacterManager from "./interfaces/managers/ICharacterManager";
import SaveManager from "./managers/SaveManager";
import AssetManager from "./managers/AssetManager";
import CharacterManager from "./managers/CharacterManager";

class PamyuCore implements IPamyu {
  private static _instance: IPamyu;

  public container: HTMLElement | null = null;

  public assetManager: IAssetManager;

  public messageManager: IMessageManager;

  public characterManager: ICharacterManager;

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
    this.characterManager = new CharacterManager();
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

    this.createElements(selector, color, options);

    void this.importStyles();
    this.initHtmlElements();

    Translation.i.setLanguage("fr");

    this.listenNext();

    this.characterManager.createPlacements();

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

  private createElements(
    selector: string | HTMLElement,
    color = "black",
    options: AppOptions = {}
  ): void {
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
  }

  private listenNext(): void {
    addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter" && this.canContinue) {
        this.canContinue = false;
        void this.next().then(() => (this.canContinue = true));
      }
    });
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
