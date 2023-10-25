import {Character} from './character.ts';
import {Color} from './globals.ts';
import {Action, Label} from './scene.ts';

export type SettingsState = {
    locale: 'en' | 'fr';
    theme: {
        color: Color;
    }
}

export type PamyuState = {
    version: string;
}

export type CharactersState = {
    folders: { [key: string]: Character['_id'][] };
    characters: Character[];
}

export type ScenesState = {
    scenes: Label[];
    actions: Action[];
}

export type State = Partial<{
    Settings: Partial<SettingsState>;
    Pamyu: Partial<PamyuState>;
    CharactersData?: Partial<CharactersState>;
    ScenesData?: Partial<ScenesState>;
}>