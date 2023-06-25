import {ICharacter} from "./ICharacter";

export interface IDialog {
    language: string;
    text: string;
    character: ICharacter;
}