import { Pamyu } from "./Pamyu";
export class Character {
    constructor(name, options) {
        var _a, _b;
        this.allowedExpressions = [];
        this.visible = true;
        this.position = 0;
        this.expression = "normal";
        this.getName = (isThinking) => {
            if (isThinking)
                return `( ${this.name} )`;
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
        this.color = (_a = options.color) !== null && _a !== void 0 ? _a : "#F3ECF3";
        this.isDemon = (_b = options.isDemon) !== null && _b !== void 0 ? _b : false;
        if (options.expressions == "*") {
            this.allowedExpressions = Pamyu.assetManager.getExpressions();
        }
        else {
            this.allowedExpressions = Array.isArray(options.expressions)
                ? options.expressions
                : ["normal"];
        }
        Pamyu.assetManager.registerExpressions(this);
    }
}
//# sourceMappingURL=Character.js.map