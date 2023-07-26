import Pamyu from "./Pamyu";
export default class Character {
    constructor(name, options = {}) {
        this.allowedExpressions = [];
        this.visible = true;
        this.position = 0;
        this.expression = "normal";
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
        this.getExpression = () => this.expression;
        this.setVisible = (visible) => {
            this.visible = visible;
            return this;
        };
        this.setPosition = (position) => {
            this.position = position;
            return this;
        };
        this.setExpression = (expression) => {
            if (this.allowedExpressions.includes(expression)) {
                if (this.expression !== expression)
                    this.expression = expression;
            }
            else {
                console.error(`Character ${this.name} does not have expression ${expression}`);
            }
            return this;
        };
        this.name = name;
        this.color = options.color ?? "#F3ECF3";
        this.isDemon = options.isDemon ?? false;
        this.allowedExpressions = this.getAllowedExpressions(options);
        Pamyu.assetManager.registerExpressions(this);
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
    getAllowedExpressions(options) {
        if (options.expressions == "*") {
            return Pamyu.assetManager.getExpressions();
        }
        else {
            return Array.isArray(options.expressions)
                ? options.expressions
                : ["normal"];
        }
    }
}
//# sourceMappingURL=Character.js.map