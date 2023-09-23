import {invoke} from "@tauri-apps/api/tauri";
import {path} from "../main.ts";
import {useCharacterStore} from "../stores/characterStore.ts";
import {watch} from "vue";
import {get_characters_script} from "./pamyu.ts";

export function update_characters() {
    watch(useCharacterStore().getCharacters, () => {
        console.log("📂 Updating", `${path}/game/characters.rpy`)
        invoke("update_data", {
            path,
            file: "characters.rpy",
            data: get_characters_script()
        })
            .then(r => console.log(r))
            .catch(e => console.error(e))
    })
}