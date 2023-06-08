import {App} from "./core/App";
import {Scene} from "./core/Scene";


App.i
    .create(1920, 1080, {backgroundColor: 0x281C2B})
    .bindTo("#app")

new Scene("main_menu", "global")

App.i.sceneManager.setScene("main_menu")