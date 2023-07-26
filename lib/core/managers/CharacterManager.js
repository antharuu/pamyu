import Pamyu from "../Pamyu";
export default class CharacterManager {
    constructor() {
        this.positions = [];
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
        Object.keys(positions).forEach((position) => characterContainer.appendChild(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.createSideElement(position, positions[position])));
        this.setAlignments();
    }
    join(character, position) {
        if (!this.checkPosition(position)) {
            throw new Error(`Position ${position} does not exist`);
        }
        const currentPosition = this.getPosition(position);
        currentPosition.element.style.backgroundImage = `url(${character.getSprite() ?? ""})`;
        return this;
    }
    createSideElement(positionName, positionValue) {
        const sideContainer = document.createElement("div");
        sideContainer.classList.add("pamyu__character-side");
        sideContainer.classList.add(`character-side-${positionName}`);
        for (let i = 0; i < positionValue; i++) {
            sideContainer.appendChild(this.createCharacterElement(positionName, positionValue > 1, i + 1));
        }
        sideContainer.style.gridTemplateColumns = `repeat(${positionValue}, 1fr)`;
        return sideContainer;
    }
    createCharacterElement(positionName, hasMultiplePositions, index) {
        const placement = document.createElement("div");
        let className = `character-${positionName}`;
        placement.classList.add("pamyu__character");
        placement.classList.add(className);
        if (hasMultiplePositions) {
            className = `${className}-${index}`;
        }
        placement.classList.add(className);
        this.positions.push({
            name: hasMultiplePositions ? `${positionName}-${index}` : positionName,
            element: placement,
        });
        return placement;
    }
    getSidePositions(positions) {
        if (typeof positions === "string") {
            return this.getStringPositions(positions);
        }
        else if (Array.isArray(positions)) {
            return this.getArrayPositions(positions);
        }
        else {
            return positions;
        }
    }
    getStringPositions(positions) {
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
        return this.getStringPositionsFrom(positionsArray);
    }
    getStringPositionsFrom(positionsArray) {
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
    getArrayPositions(positions) {
        const pos = {};
        positions.forEach((position) => {
            pos[position] = 1;
        });
        return pos;
    }
    setAlignments() {
        const max = this.positions.length;
        const odd = max % 2 === 1;
        this.positions.forEach((_, i) => {
            let align = "center";
            if (!odd) {
                if (i < max / 2) {
                    align = "left";
                }
                else {
                    align = "right";
                }
            }
            else {
                if (i < Math.floor(max / 2)) {
                    align = "left";
                }
                else if (i > Math.floor(max / 2)) {
                    align = "right";
                }
            }
            this.positions[i].element.classList.add(`pamyu__character--align:${align}`);
        });
    }
    getPosition(position) {
        if (typeof position === "number") {
            return this.positions[position - 1];
        }
        else {
            return this.positions.find((pos) => pos.name === position);
        }
    }
    checkPosition(position) {
        return this.getPosition(position) !== undefined;
    }
}
//# sourceMappingURL=CharacterManager.js.map