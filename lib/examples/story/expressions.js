import { Pamyu } from "../../index";
export var Expression;
(function (Expression) {
    Expression["Angry"] = "Angry";
    Expression["Confused"] = "Confused";
    Expression["Determined"] = "Determined";
    Expression["Embarrassed"] = "Embarrassed";
    Expression["Happy"] = "Happy";
    Expression["Normal"] = "Normal";
    Expression["Regret"] = "Regret";
    Expression["Sad"] = "Sad";
    Expression["Shy"] = "Shy";
    Expression["Surprised"] = "Surprised";
    Expression["Worried"] = "Worried";
})(Expression || (Expression = {}));
Pamyu.assetManager
    .registerExpressionPattern("chars/{character}/{side}/{expression}.png")
    .setExpressions(Expression);
export default Expression;
//# sourceMappingURL=expressions.js.map