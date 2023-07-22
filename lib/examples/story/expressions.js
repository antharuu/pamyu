import { Pamyu } from "../../index";
export var Expression;
(function (Expression) {
    Expression["Angry"] = "angry";
    Expression["Confused"] = "confused";
    Expression["Determined"] = "determined";
    Expression["Embarrassed"] = "embarrassed";
    Expression["Happy"] = "happy";
    Expression["Normal"] = "normal";
    Expression["Regret"] = "regret";
    Expression["Sad"] = "sad";
    Expression["Shy"] = "shy";
    Expression["Surprised"] = "surprised";
    Expression["Worried"] = "worried";
})(Expression || (Expression = {}));
Pamyu.assetManager
    .registerExpressionPattern("chars/{character}/{side}/{expression}.png")
    .setExpressions(Expression);
export default Expression;
//# sourceMappingURL=expressions.js.map