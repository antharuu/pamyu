import * as PIXI from 'pixi.js'
import {SceneManager} from "./SceneManager";
import {IApplicationOptions} from "pixi.js";

export class App {
    private static __instance: App;
    private static __sceneManager: SceneManager;

    private _app: PIXI.Application | null = null;

    private _boundElement: Element | null = null;

    private _width: number = 0;
    private _height: number = 0;

    private _aspectRatio = 16 / 9;

    constructor() {
        console.log("-------- App --------")
        App.__sceneManager = new SceneManager();
    }

    public static get i(): App {
        if (!App.__instance) {
            App.__instance = new App();
        }
        return App.__instance;
    }

    public get sceneManager(): SceneManager {
        return App.__sceneManager;
    }

    public create(width: number, height: number, options?: Partial<IApplicationOptions>): App {
        this._width = width;
        this._height = height;

        this._app = new PIXI.Application({
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
        if (!this._app || !this._app.renderer.view.style) return;
        if (width / height <= this._aspectRatio) {
            this._app.renderer.resolution = width / this._width;
            this._app.renderer.view.style.width = `${width}px`;
            this._app.renderer.view.style.height = `${(width / this._aspectRatio)}px`;
        } else {
            this._app.renderer.resolution = height / this._height;
            this._app.renderer.view.style.width = `${(height * this._aspectRatio)}px`;
            this._app.renderer.view.style.height = `${height}px`;
        }
        this._app.renderer.resize(this._width, this._height);
    }

    public bindTo(selector: string): App {
        const appElement = document.querySelector(selector);
        if (!appElement) throw new Error('No app element found')
        this._boundElement = appElement;

        this.attachToElement();

        return this;
    }

    private attachToElement() {
        if (!this._app || !this._boundElement) return;
        this._boundElement.appendChild(this._app.view as HTMLCanvasElement);
    }

    getApp(): PIXI.Application {
        if (!this._app) throw new Error('App not created yet')
        return this._app;
    }
}