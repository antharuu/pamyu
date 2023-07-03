import Pamyu from "../core/Pamyu";

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

console.log(Pamyu.assetManager);

Pamyu.assetManager
  .setExpressionPattern("chars/{character}/{side}/{expression}.png")
  .setExpressions(Expression);

export default Expression;
