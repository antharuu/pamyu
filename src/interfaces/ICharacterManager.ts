import {ICharacter} from "./ICharacter";

export interface ICharacterManager {
    get characters(): Map<string, ICharacter>;
}