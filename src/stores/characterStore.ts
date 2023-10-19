import {defineStore} from 'pinia';

import {
    capitalize,
    getCleanName,
    getCleanNameWithSpaces,
    getRandomToken,
    getUndefinedIfEmptyString
} from '../utils/tools.ts';

import {Character} from '../types/character.ts';
import {CharactersState} from '../types/state.ts';

export const useCharacterStore = defineStore({
    id: 'CharactersData',
    state: (): CharactersState => ({
        characters: [],
        folders: {}
    }),
    getters: {
        getCharacters(): Character[] {
            return this.characters || [];
        },
        getCharacterById(): (id: string) => Character | undefined {
            return (id: string) => this.characters.find((character) => character._id === id);
        },
        getCharactersFolders(): string[] {
            return Object.keys(this.folders || {});
        }
    },
    actions: {
        createFolder(name: string): void {
            const cleanName = getCleanNameWithSpaces(name);
            if (!this.folders) this.folders = {};
            if (!this.folders[cleanName]) this.folders[cleanName] = [];
        },
        deleteFolder(key: string): void {
            if (this.folders && this.folders[key]) {
                this.characters.forEach((character) => {
                    if (character.folder === key) character.folder = undefined;
                });

                delete this.folders[key];
            }
        },
        moveCharacter(character: Character, folder: string | undefined): void {
            const cleanFolder = folder ?? undefined;

            if (!this.isFolderValid(cleanFolder)) {
                return;
            }

            const char = this.getCharacterById(character._id);
            if (!char) {
                return;
            }

            this.removeCharacterFromOldFolder(char);
            this.updateCharacterFolder(char, cleanFolder);
            this.addCharacterToNewFolder(char, cleanFolder);
        },
        updateCharacterFolder(char: Character, folder: string | undefined): void {
            char.folder = folder;
        },
        removeCharacterFromOldFolder(char: Character): void {
            const oldFolder = char.folder;
            if (oldFolder) {
                this.folders[oldFolder] = this.folders[oldFolder].filter((id) => id !== char._id);
            }
        },
        addCharacterToNewFolder(char: Character, folder: string | undefined): void {
            if (folder && this.folders[folder]) {
                this.folders[folder].push(char._id);
            }
        },
        isFolderValid(cleanFolder: string | undefined): boolean {
            return !!(!cleanFolder || (cleanFolder && this.folders && this.folders[cleanFolder]));
        },
        getUniqueCharacterId(name: string): string {
            const cleanName = getCleanName(name);
            const randomId = cleanName + '_' + getRandomToken(8);
            if (this.getCharacterById(randomId)) return this.getUniqueCharacterId(cleanName);
            return randomId;
        },
        addCharacter(character: Partial<Character>) {
            const name = character.name || 'Unknown';
            const randomId = this.getUniqueCharacterId(name);

            this.characters.push({
                _id: randomId,
                name: capitalize(name),
                color: character.color || '#ffffff',
                what_prefix: getUndefinedIfEmptyString(character.what_prefix),
                what_suffix: getUndefinedIfEmptyString(character.what_suffix),
                who_prefix: getUndefinedIfEmptyString(character.who_prefix),
                who_suffix: getUndefinedIfEmptyString(character.who_suffix),
            });
        },
        updateCharacter(character: Character) {
            const char = this.getCharacterById(character._id);
            if (char) {
                char.name = capitalize(character.name);
                char.color = getUndefinedIfEmptyString(character.color);
                char.what_prefix = getUndefinedIfEmptyString(character.what_prefix);
                char.what_suffix = getUndefinedIfEmptyString(character.what_suffix);
                char.who_prefix = getUndefinedIfEmptyString(character.who_prefix);
                char.who_suffix = getUndefinedIfEmptyString(character.who_suffix);
            }
        },
        deleteCharacter(character: Character) {
            const char = this.getCharacterById(character._id);
            if (char) {
                this.characters.splice(this.characters.indexOf(char), 1);
            }
        }
    }
});