import {invoke} from '@tauri-apps/api/tauri';
import {defineStore} from 'pinia';
import {computed} from 'vue';

import {Config} from '../utils/config.ts';
import {PathManager} from '../utils/path.ts';
import {Script} from '../utils/script.ts';

import {ProjectSettings} from '../types/globals.ts';


export const useProjectStore = defineStore('Game', {
    state: (): ProjectSettings => ({
        name: '',
        showName: true,
        version: '1.0',
        about: '',
        buildName: '',
        hasSound: true,
        hasMusic: true,
        hasVoice: true,
        transitionEnter: 'dissolve',
        transitionExit: 'dissolve',
        transitionIntra: 'dissolve',
        transitionAfterLoad: 'None',
        transitionEndGame: 'None',
        transitionWindowShow: 'Dissolve(.2)',
        transitionWindowHide: 'Dissolve(.2)',
        window: 'auto',
        cps: 0,
        afm: 15,
        saveDirectory: '',
        windowIcon: ''
    }),
    getters: {
        getProject(): ProjectSettings {
            return computed(() => this.$state).value;
        }
    },
    actions: {
        setVars: async function () {
            console.log('⚓ Setting project configuration');
            const keyValues = {};
            Config.getNames.forEach(name => keyValues[name] = this[name]);
            const script = await Script.setVars(keyValues);

            await invoke('update_script', {path: PathManager.last?.path, file: 'options.rpy', data: script});
        },
        async init(): Promise<void> {
            if (this.name.length && this.buildName.length) return;
            console.log('⚓ Getting project configuration');

            await this.initScript();
            const data = Script.getVars(Config.getNames);
            Object.entries(data).forEach(([name, value]) =>
                this[name] = Config.getValue(name, value));
        },
        async updateProject(data: ProjectSettings): Promise<void> {
            data.buildName = data.buildName.replace(/ /g, '');

            Object.entries(data).forEach(([key, value]) => this[key] = value);

            await this.initScript();
            await this.setVars();
        },
        async initScript(): Promise<void> {
            const res: string = await invoke('load_script', {path: PathManager.last?.path, file: 'options.rpy'});
            if (!res) return;
            Script.setCurrentScript(res);
        }
    }
});