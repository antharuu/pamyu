import Chapter1_ArrivePort from "./story/chapter1/1_arrive_port";
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
  sides: ["Gauche", "Droite"],
  positions: ["Gauche", "Droite"],
});

console.info("Pamyu config: ", Pamyu.config);

Pamyu.create("#app", "purple", {
  background: "Global",
})
  .prepare([Characters, Assets])
  .registerScenes([Chapter1_ArrivePort]);
