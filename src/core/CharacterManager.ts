import {ICharacterManager} from "../interfaces/ICharacterManager";
import {ICharacter} from "../interfaces/ICharacter";

export class CharacterManager implements ICharacterManager {
    characters: Map<string, ICharacter> = new Map<string, ICharacter>();

    getCharacter(name: string): ICharacter {
        return this.characters.get(name) as ICharacter;
    }
}