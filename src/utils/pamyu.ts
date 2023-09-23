import {useCharacterStore} from "../stores/characterStore.ts";

export function get_characters_script(): string {
    const charactersStrings: string[] = []

    useCharacterStore().getCharacters.forEach((character) => {
        let options = ""
        if (character.color) options += `, color="${character.color}"`
        const characterString = `define ${character._id} = Character("${character.name}"${options})`
        charactersStrings.push(characterString)
    })

    return charactersStrings.join("\n")
}