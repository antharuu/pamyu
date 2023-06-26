import "./styles/global.scss"
import {App} from "./core/App";
import Chapter1_ArrivePort from "./story/chapter1/1_arrive_port";

App.i
    .create("#app", "purple", {
        background: "Global"
    })
    .registerScenes([
        Chapter1_ArrivePort
    ]);
