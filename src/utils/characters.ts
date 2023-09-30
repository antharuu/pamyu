import {Character} from '../types/character.ts';

export function getVisibleName(character: Character): string {
    const prefix = character.who_prefix ? character.who_prefix : '';
    const suffix = character.who_suffix ? character.who_suffix : '';
    return `${prefix}${character.name}${suffix}`;
}