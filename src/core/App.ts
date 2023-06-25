import * as PIXI from 'pixi.js'
import {Application, IApplicationOptions} from "pixi.js";
import {IApp} from "../interfaces/IApp";
import {SceneManager} from "./SceneManager";
import {IDialogManager} from "../interfaces/IDialogManager";
import {ICharacterManager} from "../interfaces/ICharacterManager";
import {IAssetManager} from "../interfaces/IAssetManager";
import {IVariableManager} from "../interfaces/IVariableManager";
import {ISceneManager} from "../interfaces/ISceneManager";
import {DialogManager} from "./DialogManager";
import {CharacterManager} from "./CharacterManager";
import {AssetManager} from "./AssetManager";
import {VariableManager} from "./VariableManager";

export class App implements IApp {
    private static _instance: App;

    private _pixi: PIXI.Application | null = null;

    private readonly _sceneManager: ISceneManager;
    private readonly _dialogManager: IDialogManager;
    private readonly _characterManager: ICharacterManager;
    private readonly _assetManager: IAssetManager;
    private readonly _variableManager: IVariableManager;

    private _boundElement: Element | null = null;

    private _width: number = 0;
    private _height: number = 0;

    private _aspectRatio = 16 / 9;

    constructor() {
        console.log("-------- App --------")
        this._sceneManager = new SceneManager();
        this._dialogManager = new DialogManager();
        this._characterManager = new CharacterManager();
        this._assetManager = new AssetManager();
        this._variableManager = new VariableManager();
    }

    static get i(): App {
        if (!App._instance) {
            App._instance = new App();
        }
        return App._instance;
    }

    public create(width: number, height: number, options?: Partial<IApplicationOptions>): IApp {
        this._width = width;
        this._height = height;

        this._pixi = new PIXI.Application({
            width: this._width,
            height: this._height,
            resolution: window.devicePixelRatio || 1,
            ...options
        });

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        this.attachToElement();

        return this;
    }

    private resize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        if (!this._pixi || !this._pixi.renderer.view.style) return;
        if (width / height <= this._aspectRatio) {
            this._pixi.renderer.resolution = width / this._width;
            this._pixi.renderer.view.style.width = `${width}px`;
            this._pixi.renderer.view.style.height = `${(width / this._aspectRatio)}px`;
        } else {
            this._pixi.renderer.resolution = height / this._height;
            this._pixi.renderer.view.style.width = `${(height * this._aspectRatio)}px`;
            this._pixi.renderer.view.style.height = `${height}px`;
        }
        this._pixi.renderer.resize(this._width, this._height);
    }

    public bindTo(selector: string): IApp {
        const appElement = document.querySelector(selector);
        if (!appElement) throw new Error('No app element found')
        this._boundElement = appElement;

        this.attachToElement();

        return this;
    }

    private attachToElement() {
        if (!this._pixi || !this._boundElement) return;
        this._boundElement.appendChild(this._pixi.view as HTMLCanvasElement);
    }

    get pixi(): Application {
        if (!this._pixi) throw new Error('App not created yet')
        return this._pixi;
    }

    get assetManager(): IAssetManager {
        return this._assetManager;
    }

    get characterManager(): ICharacterManager {
        return this._characterManager;
    }

    get dialogManager(): IDialogManager {
        return this._dialogManager;
    }

    get sceneManager(): ISceneManager {
        return this._sceneManager;
    }

    get variableManager(): IVariableManager {
        return this._variableManager;
    }
}