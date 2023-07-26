import ICharacterManager from "../interfaces/managers/ICharacterManager";
import Pamyu from "../Pamyu";

export default class CharacterManager implements ICharacterManager {
  private positions: { [key: string]: HTMLDivElement } = {};

  public createPlacements(): void {
    const characterContainer = document.createElement("div");
    characterContainer.classList.add("pamyu__character-container");

    const app = document.querySelector(".pamyu__app");
    if (app) {
      app.appendChild(characterContainer);
    }

    let { positions } = Pamyu.config;

    positions = this.getSidePositions(positions);

    const sideCols = Object.keys(positions).length;
    characterContainer.style.gridTemplateColumns = `repeat(${sideCols}, 1fr)`;

    Object.keys(positions).forEach((position: string) =>
      characterContainer.appendChild(
        this.createSideElement(
          position,
          (
            positions as {
              [key: string]: number;
            }
          )[position]
        )
      )
    );
  }

  private createSideElement(
    positionName: string,
    positionValue: number
  ): HTMLDivElement {
    const sideContainer = document.createElement("div");
    sideContainer.classList.add("pamyu__character-side");
    sideContainer.classList.add(`character-side-${positionName}`);

    for (let i = 0; i < positionValue; i++) {
      sideContainer.appendChild(
        this.createCharacterElement(positionName, positionValue > 1, i + 1)
      );
    }

    sideContainer.style.gridTemplateColumns = `repeat(${positionValue}, 1fr)`;
    return sideContainer;
  }

  private createCharacterElement(
    positionName: string,
    hasMultiplePositions: boolean,
    index: number
  ): HTMLDivElement {
    const placement = document.createElement("div");
    let className = `character-${positionName}`;
    placement.classList.add("pamyu__character");
    placement.classList.add(className);
    if (hasMultiplePositions) {
      className = `${className}-${index}`;
    }

    placement.classList.add(className);
    this.positions[
      hasMultiplePositions ? `${positionName}-${index}` : positionName
    ] = placement;
    return placement;
  }

  private getSidePositions(
    positions: { [key: string]: number } | string[] | string
  ): { [key: string]: number } {
    if (typeof positions === "string") {
      return this.getStringPositions(positions);
    } else if (Array.isArray(positions)) {
      return this.getArrayPositions(positions);
    } else {
      return positions;
    }
  }

  private getStringPositions(positions: string): { [key: string]: number } {
    const positionsArray = positions.split(" ").map((pos) => {
      const num = parseInt(pos);
      if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
        throw new Error(
          "The positions in string format must contain only numbers (integers and positive)"
        );
      }
      return num;
    });
    if (positionsArray.length < 1 || positionsArray.length > 3) {
      throw new Error(
        "The positions in string format must contain 1 or 3 values separated by a space"
      );
    }

    return this.getStringPositionsFrom(positionsArray);
  }

  private getStringPositionsFrom(positionsArray: number[]): {
    [key: string]: number;
  } {
    const pos: { [key: string]: number } = {};
    if (positionsArray.length === 3) {
      pos.left = positionsArray[0];
      pos.center = positionsArray[1];
      pos.right = positionsArray[2];
    } else if (positionsArray.length === 2) {
      pos.left = positionsArray[0];
      pos.right = positionsArray[1];
    } else if (positionsArray.length === 1) {
      pos.center = positionsArray[0];
    }

    return pos;
  }

  private getArrayPositions(positions: string[]): { [key: string]: number } {
    const pos: { [key: string]: number } = {};
    positions.forEach((position) => {
      pos[position] = 1;
    });
    return pos;
  }
}
