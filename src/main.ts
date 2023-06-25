import {App} from "./core/App";
import {Scene} from "./core/Scene";


App.i
    .create(1920, 1080, {backgroundColor: 0x281C2B})
    .bindTo("#app")

new Scene("main_menu", "Global")
new Scene("chapter:1_scene:1", "Port")


App.i.sceneManager.changeTo("main_menu")

setTimeout(() => {
    App.i.sceneManager.changeTo("chapter:1_scene:1")
}, 2000)