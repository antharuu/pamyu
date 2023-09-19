import {defineStore} from "pinia";
import {getRandomToken} from "../utils/tools.ts";
import {Character} from "../types/character.ts";

export const useCharacterStore = defineStore({
    id: "CharactersData",
    state: (): {
        characters: Character[]
    } => ({
        characters: [],
    }),
    getters: {
        getCharacters(): Character[] {
            return this.characters || []
        }
    },
    actions: {
        addCharacter(name: string, color: { r: number, g: number, b: number }) {
            const token = getRandomToken()
            this.characters.push({ name, color, _id: token })
        }
    }
})