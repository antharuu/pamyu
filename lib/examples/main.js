import "../styles/global.scss";
import Chapter1_ArrivePort from "./story/chapter1/1_arrive_port";
import Expression from "./story/expressions";
import Characters from "./story/characters";
import Assets from "./story/assets";
import { Pamyu } from "../index";
Pamyu.configure({
    messageSpeed: 10,
    translationFile: "./trad.yaml",
})
    .create("#app", "purple", {
    background: "Global",
})
    .prepare([Characters, Expression, Assets])
    .registerScenes([Chapter1_ArrivePort]);
//# sourceMappingURL=main.js.map