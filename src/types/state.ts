import {Character} from './character.ts';
import {Color} from './globals.ts';

export type SettingsState = Partial<{
    locale: 'en' | 'fr';
    theme: {
        color: Color;
    }
}>

export type PamyuState = Partial<{
    version: string;
}>

export type State = Partial<{
    Settings: SettingsState;
    Pamyu: PamyuState;
    CharactersData?: {
        folders?: { [key: string]: Character['_id'][] };
        characters?: Character[];
    }
}>