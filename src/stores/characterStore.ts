import {defineStore} from "pinia";
import {capitalize, getCleanName, getRandomToken, getUndefinedIfEmptyString} from "../utils/tools.ts";
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
            const cleanName = getCleanName(name)
            const randomId = cleanName + "_" + getRandomToken(8)
            if (this.getCharacterById(randomId)) return this.getUniqueCharacterId(cleanName)
            return randomId
        },
        addCharacter(character: Partial<Character>) {
            const name = character.name || "Unknown";
            const randomId = this.getUniqueCharacterId(name)

            this.characters.push({
                _id: randomId,
                name: capitalize(name),
                color: character.color || "#ffffff",
                what_prefix: getUndefinedIfEmptyString(character.what_prefix),
                what_suffix: getUndefinedIfEmptyString(character.what_suffix),
                who_prefix: getUndefinedIfEmptyString(character.who_prefix),
                who_suffix: getUndefinedIfEmptyString(character.who_suffix),
            })
        },
        updateCharacter(character: Character) {
            const char = this.getCharacterById(character._id)
            if (char) {
                char.name = capitalize(character.name)
                char.color = getUndefinedIfEmptyString(character.color)
                char.what_prefix = getUndefinedIfEmptyString(character.what_prefix)
                char.what_suffix = getUndefinedIfEmptyString(character.what_suffix)
                char.who_prefix = getUndefinedIfEmptyString(character.who_prefix)
                char.who_suffix = getUndefinedIfEmptyString(character.who_suffix)
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