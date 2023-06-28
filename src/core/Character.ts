import {CharacterOptions} from "./types/app";
import {ICharacter} from "./interfaces/ICharacter";

export class Character implements ICharacter {
    name: string;
    color: string;
    isDemon: boolean;

    constructor(name: string, options: CharacterOptions) {
        this.name = name;
        this.color = options.color || "#F3ECF3";
        this.isDemon = options.isDemon || false;
    }

    public getName = (thinking: boolean): string => {
        if(thinking) return `( ${this.name} )`;
        return this.name;
    };

    public getColor= (): string => this.color;

    public getIsDemon = (): boolean => this.isDemon;
}