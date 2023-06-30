import {App} from "../core/App";

export enum Expression {
    Angry = "angry",
    Confused = "confused",
    Determined = "determined",
    Embarrassed = "embarrassed",
    Happy = "happy",
    Normal = "normal",
    Regret = "regret",
    Sad = "sad",
    Shy = "shy",
    Surprised = "surprised",
    Worried = "worried",
}

App.i.assetManager
    .setExpressionPatern('chars/{character}/{side}/{expression}.png', '-inverted')
    .setExpressions(Expression)

export default Expression