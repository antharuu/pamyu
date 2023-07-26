import { CharacterOptions } from "./types/app";
import ICharacter from "./interfaces/ICharacter";
export default class Character implements ICharacter {
    readonly name: string;
    readonly color: string;
    readonly isDemon: boolean;
    readonly allowedExpressions: string[];
    visible: boolean;
    position: number;
    expression: string;
    constructor(name: string, options?: CharacterOptions);
    getName: (isThinking: boolean) => string;
    getColor: () => string;
    getIsDemon: () => boolean;
    getVisible: () => boolean;
    getPosition: () => number;
    getExpression: () => string;
    setVisible: (visible: boolean) => ICharacter;
    setPosition: (position: number) => ICharacter;
    setExpression: (expression: string) => ICharacter;
    private getThinkCharacters;
}
