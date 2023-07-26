import Pamyu from "./Pamyu";
export default class Character {
    constructor(name, options = {}) {
        this.visible = true;
        this.position = 0;
        this.getName = (isThinking) => {
            const { prefix, suffix } = this.getThinkCharacters();
            if (isThinking)
                return prefix + this.name + suffix;
            return this.name;
        };
        this.getColor = () => this.color;
        this.getIsDemon = () => this.isDemon;
        this.getVisible = () => this.visible;
        this.getPosition = () => this.position;
        this.setVisible = (visible) => {
            this.visible = visible;
            return this;
        };
        this.setPosition = (position) => {
            this.position = position;
            return this;
        };
        this.name = name;
        this.color = options.color ?? "#F3ECF3";
        this.isDemon = options.isDemon ?? false;
    }
    setSprite(expression) {
        this.sprite = expression;
        return this;
    }
    getSprite() {
        return this.sprite;
    }
    getThinkCharacters() {
        let thinkCharacters = Pamyu.config.thinkCharacters;
        if (Array.isArray(thinkCharacters)) {
            thinkCharacters = {
                prefix: thinkCharacters[0],
                suffix: thinkCharacters[1],
            };
        }
        return {
            prefix: thinkCharacters.prefix ?? "",
            suffix: thinkCharacters.suffix ?? "",
        };
    }
}
//# sourceMappingURL=Character.js.map