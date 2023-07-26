import Chapter1_ArrivePort from "./story/chapter1/1_arrive_port";
import Expression from "./story/expressions";
import Characters from "./story/characters";
import Assets from "./story/assets";
import { Pamyu } from "../index";

Pamyu.configure({
  messageSpeed: 10,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  translation: await import("./trad.yaml"),
  defaultLanguage: "fr",
  pamyuDevEnv: true,
  positions: "1 5 3",
})
  .create("#app", "purple", {
    background: "Global",
  })
  .prepare([Characters, Expression, Assets])
  .registerScenes([Chapter1_ArrivePort]);
