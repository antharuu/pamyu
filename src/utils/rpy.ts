import {invoke} from '@tauri-apps/api/tauri';
import {watch} from 'vue';

import {useCharacterStore} from '../stores/characterStore.ts';

import {path} from '../main.ts';

import {getCharactersScript} from './pamyu.ts';

export function updateCharacters(): void {
    watch(useCharacterStore().getCharacters, () => {
        console.log('📂 Updating', `${path}/game/characters.rpy`);
        invoke('update_script', {
            path,
            file: 'characters.rpy',
            data: getCharactersScript()
        })
            .then(r => console.log(r))
            .catch(e => console.error(e));
    });
}