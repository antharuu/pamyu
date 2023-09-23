import {defineStore} from "pinia";
import {getRandomToken, undefinedStringIfEmpty} from "../utils/tools.ts";
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
        },
        getCharacterById(): (id: string) => Character | undefined {
            return (id: string) => this.characters.find((character) => character._id === id)
        }
    },
    actions: {
        getUniqueCharacterId(name: string): string {
            const cleanName = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
            const randomId = cleanName + "_" + getRandomToken(8)
            if (this.getCharacterById(randomId)) return this.getUniqueCharacterId(cleanName)
            return randomId
        },
        addCharacter(character: Partial<Character>) {
            const name = character.name || "Unknown";
            const randomId = this.getUniqueCharacterId(name)

            this.characters.push({
                _id: randomId,
                name,
                color: character.color || "#ffffff",
                what_prefix: undefinedStringIfEmpty(character.what_prefix),
                what_suffix: undefinedStringIfEmpty(character.what_suffix),
                who_prefix: undefinedStringIfEmpty(character.who_prefix),
                who_suffix: undefinedStringIfEmpty(character.who_suffix),
            })
        },
        updateCharacter(character: Character) {
            const char = this.getCharacterById(character._id)
            if (char) {
                char.name = character.name
                char.color = undefinedStringIfEmpty(character.color)
                char.what_prefix = undefinedStringIfEmpty(character.what_prefix)
                char.what_suffix = undefinedStringIfEmpty(character.what_suffix)
                char.who_prefix = undefinedStringIfEmpty(character.who_prefix)
                char.who_suffix = undefinedStringIfEmpty(character.who_suffix)
            }
        },
        deleteCharacter(character: Character) {
            const char = this.getCharacterById(character._id)
            if (char) {
                this.characters.splice(this.characters.indexOf(char), 1)
            }
        }
    }
})