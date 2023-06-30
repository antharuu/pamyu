import {CharacterOptions} from "./types/app";
import {ICharacter} from "./interfaces/ICharacter";

export class Character implements ICharacter {
    name: string;
    color: string;
    isDemon: boolean;
    allowedExpressions: string[] = [];

    visible: boolean = true;
    position: number = 0;
    expression: string = "normal";

    constructor(name: string, options: CharacterOptions) {
        this.name = name;
        this.color = options.color || "#F3ECF3";
        this.isDemon = options.isDemon || false;
        this.allowedExpressions = options.expressions || [];
    }

    public getName = (thinking: boolean): string => {
        if (thinking) return `( ${this.name} )`;
        return this.name;
    };

    public getColor = (): string => this.color;

    public getIsDemon = (): boolean => this.isDemon;

    public getVisible = (): boolean => this.visible;

    public getPosition = (): number => this.position;

    public getExpression = (): string => this.expression;

    public setVisible = (visible: boolean): ICharacter => {
        this.visible = visible;
        return this;
    }

    public setPosition = (position: number): ICharacter => {
        this.position = position;
        return this;
    }

    public setExpression = (expression: string): ICharacter => {
        if (this.allowedExpressions.includes(expression)) {
            if (this.expression !== expression) {
                console.log(`Character ${this.name} expression changed to ${expression}`);
                this.expression = expression;
            } else {
                console.warn(`Character ${this.name} already has expression ${expression}`);
            }
        } else {
            console.error(`Character ${this.name} does not have expression ${expression}`);
        }

        return this;
    }
}