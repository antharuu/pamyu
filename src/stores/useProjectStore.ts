import {invoke} from '@tauri-apps/api/tauri';
import {defineStore} from 'pinia';

import {PathManager} from '../utils/path.ts';
import {Script} from '../utils/script.ts';
import {unwrap} from '../utils/tools.ts';

export const useProjectStore = defineStore('Project', {
    state: (): {
        name: string;
        showName: boolean;
        version: string;
        about: string;
        buildName: string;
        hasSound: boolean;
        hasMusic: boolean;
        hasVoice: boolean;
        transitionEnter: string;
        transitionExit: string;
        transitionIntra: string;
        transitionAfterLoad: string;
        transitionEndGame: string;
        transitionWindowShow: string;
        transitionWindowHide: string;
        window: 'auto' | 'show' | 'hide';
        cps: number;
        afm: number;
        saveDirectory: string;
        windowIcon: string;
    } => ({
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
    getters: {},
    actions: {
        async init(): Promise<void> {
            if (this.name.length && this.buildName.length) return;
            console.log('⚓ Getting project configuration');
            const res: string = await invoke('load_script', {path: PathManager.last?.path, file: 'options.rpy'});
            if (!res) return;
            Script.set(res);
            const data = Script.getVars({
                name: 'config.name',
                showName: 'gui.show_name',
                version: 'config.version',
                about: 'gui.about',
                buildName: 'build.name',
                hasSound: 'config.has_sound',
                hasMusic: 'config.has_music',
                hasVoice: 'config.has_voice',
                transitionEnter: 'config.enter_transition',
                transitionExit: 'config.exit_transition',
                transitionIntra: 'config.intra_transition',
                transitionAfterLoad: 'config.after_load_transition',
                transitionEndGame: 'config.end_game_transition',
                transitionWindowShow: 'config.window_show_transition',
                transitionWindowHide: 'config.window_hide_transition',
                window: 'config.window',
                cps: 'preferences.text_cps',
                afm: 'preferences.afm_time',
                saveDirectory: 'config.save_directory',
                windowIcon: 'config.window_icon'
            });

            this.name = unwrap(data.name as string, '_(\"', '")');
            this.showName = data.showName as boolean;
            this.version = data.version as string;
            this.about = unwrap(data.about as string, '_p(\"\"\"', '');
            this.buildName = data.buildName as string;
            this.hasSound = data.hasSound as boolean;
            this.hasMusic = data.hasMusic as boolean;
            this.hasVoice = data.hasVoice as boolean;
            this.transitionEnter = data.transitionEnter as string;
            this.transitionExit = data.transitionExit as string;
            this.transitionIntra = data.transitionIntra as string;
            this.transitionAfterLoad = data.transitionAfterLoad as string;
            this.transitionEndGame = data.transitionEndGame as string;
            this.transitionWindowShow = data.transitionWindowShow as string;
            this.transitionWindowHide = data.transitionWindowHide as string;
            this.window = data.window as 'auto' | 'show' | 'hide';
            this.cps = data.cps as number;
            this.afm = data.afm as number;
            this.saveDirectory = data.saveDirectory as string;
            this.windowIcon = data.windowIcon as string;
        }
    }
});