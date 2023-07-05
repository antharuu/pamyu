import "./styles/global.scss";
import Pamyu from "./core/Pamyu";
import Chapter1_ArrivePort from "./story/chapter1/1_arrive_port";
import Expression from "./story/expressions";
import Characters from "./story/characters";
import Assets from "./story/assets";

Pamyu.configure({
  messageSpeed: 10,
})
  .create("#app", "purple", {
    background: "Global",
  })
  .prepare([Characters, Expression, Assets])
  .registerScenes([Chapter1_ArrivePort]);
