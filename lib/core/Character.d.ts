import { CharacterOptions } from "./types/app";
import ICharacter from "./interfaces/ICharacter";
export default class Character implements ICharacter {
    readonly name: string;
    readonly color: string;
    readonly isDemon: boolean;
    visible: boolean;
    position: number;
    private sprite;
    constructor(name: string, options?: CharacterOptions);
    getName: (isThinking: boolean) => string;
    getColor: () => string;
    getIsDemon: () => boolean;
    getVisible: () => boolean;
    getPosition: () => number;
    setSprite(expression: string | undefined): ICharacter;
    getSprite(): string | undefined;
    setVisible: (visible: boolean) => ICharacter;
    setPosition: (position: number) => ICharacter;
    private getThinkCharacters;
}
