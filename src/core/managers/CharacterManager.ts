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

    const { positions } = Pamyu.config;

    const sideCols = Object.keys(positions).length;
    characterContainer.style.gridTemplateColumns = `repeat(${sideCols}, 1fr)`;

    // if positions is an array, we need to convert it to an object
    const positionsArray = Array.isArray(positions);

    (positionsArray ? positions : Object.keys(positions)).forEach(
      (position) => {
        let cols = 0;
        const sideContainer = document.createElement("div");
        sideContainer.classList.add("pamyu__character-side");
        sideContainer.classList.add(`character-side-${position}`);

        const pos = positionsArray ? 1 : positions[position];
        for (let i = 0; i < pos; i++) {
          const placement = document.createElement("div");
          let className = `character-${position}`;
          placement.classList.add("pamyu__character");
          placement.classList.add(className);
          if (pos > 1) {
            className = `${className}-${i + 1}`;
          }

          placement.classList.add(className);
          sideContainer.appendChild(placement);
          cols++;
          if (pos > 1) {
            this.positions[`${position}-${i + 1}`] = placement;
          } else {
            this.positions[position] = placement;
          }
        }

        sideContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        characterContainer.appendChild(sideContainer);
      }
    );
  }
}
