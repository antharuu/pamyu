import Character from "../../Character";
export default interface ICharacterManager {
    createPlacements(): void;
    join(character: Character, position: number | string, expression?: string): ICharacterManager;
}
