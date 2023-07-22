import { Pamyu } from "../../index";

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

Pamyu.assetManager
  .registerExpressionPattern("chars/{character}/{side}/{expression}.png")
  .setExpressions(Expression);

export default Expression;
