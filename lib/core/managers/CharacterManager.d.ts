import ICharacterManager from "../interfaces/managers/ICharacterManager";
import Character from "../Character";
export default class CharacterManager implements ICharacterManager {
    private readonly positions;
    createPlacements(): void;
    join(character: Character, position: number | string): ICharacterManager;
    private createSideElement;
    private createCharacterElement;
    private getSidePositions;
    private getStringPositions;
    private getStringPositionsFrom;
    private getArrayPositions;
    private setAlignments;
    private getPosition;
    private checkPosition;
}
