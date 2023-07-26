import Pamyu from "../Pamyu";
export default class CharacterManager {
    constructor() {
        this.positions = {};
    }
    createPlacements() {
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
        Object.keys(positions).forEach((position) => {
            let cols = 0;
            const sideContainer = document.createElement("div");
            sideContainer.classList.add("pamyu__character-side");
            sideContainer.classList.add(`character-side-${position}`);
            const positionValue = positions[position];
            for (let i = 0; i < positionValue; i++) {
                const placement = document.createElement("div");
                let className = `character-${position}`;
                placement.classList.add("pamyu__character");
                placement.classList.add(className);
                if (positionValue > 1) {
                    className = `${className}-${i + 1}`;
                }
                placement.classList.add(className);
                sideContainer.appendChild(placement);
                cols++;
                if (positionValue > 1) {
                    this.positions[`${position}-${i + 1}`] = placement;
                }
                else {
                    this.positions[position] = placement;
                }
            }
            sideContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            characterContainer.appendChild(sideContainer);
        });
    }
    getSidePositions(positions) {
        if (typeof positions === "string") {
            const positionsArray = positions.split(" ").map((pos) => {
                const num = parseInt(pos);
                if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
                    throw new Error("The positions in string format must contain only numbers (integers and positive)");
                }
                return num;
            });
            if (positionsArray.length < 1 || positionsArray.length > 3) {
                throw new Error("The positions in string format must contain 1 or 3 values separated by a space");
            }
            const pos = {};
            if (positionsArray.length === 3) {
                pos.left = positionsArray[0];
                pos.center = positionsArray[1];
                pos.right = positionsArray[2];
            }
            else if (positionsArray.length === 2) {
                pos.left = positionsArray[0];
                pos.right = positionsArray[1];
            }
            else if (positionsArray.length === 1) {
                pos.center = positionsArray[0];
            }
            return pos;
        }
        else if (Array.isArray(positions)) {
            const pos = {};
            positions.forEach((position) => {
                pos[position] = 1;
            });
            return pos;
        }
        else {
            return positions;
        }
    }
}
//# sourceMappingURL=CharacterManager.js.map