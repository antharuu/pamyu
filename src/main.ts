import "./styles/global.scss"
import {App} from "./core/App";
import Chapter1_ArrivePort from "./story/chapter1/1_arrive_port";
import Expression from "./story/expressions";
import Characters from "./story/characters";

App.i
    .create("#app", "purple", {
        background: "Global"
    })
    .prepare([
        Characters,
        Expression
    ])
    .registerScenes([
        Chapter1_ArrivePort
    ]);
