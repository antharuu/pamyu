import {invoke} from '@tauri-apps/api/tauri';
import {defineStore} from 'pinia';

import {PathManager} from '../utils/path.ts';
import {Script} from '../utils/script.ts';
import {unwrap} from '../utils/tools.ts';

import {ProjectSettings} from '../types/globals.ts';

export const useProjectStore = defineStore('Project', {
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
            return {
                name: this.name,
                showName: this.showName,
                version: this.version,
                about: this.about,
                buildName: this.buildName,
                hasSound: this.hasSound,
                hasMusic: this.hasMusic,
                hasVoice: this.hasVoice,
                transitionEnter: this.transitionEnter,
                transitionExit: this.transitionExit,
                transitionIntra: this.transitionIntra,
                transitionAfterLoad: this.transitionAfterLoad,
                transitionEndGame: this.transitionEndGame,
                transitionWindowShow: this.transitionWindowShow,
                transitionWindowHide: this.transitionWindowHide,
                window: this.window,
                cps: this.cps,
                afm: this.afm,
                saveDirectory: this.saveDirectory,
                windowIcon: this.windowIcon
            };
        }
    },
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

            this.name = unwrap(data.name?.toString(), '_(\"', '")');
            this.showName = !!(data.showName) as boolean;
            this.version = data.version as string;
            this.about = unwrap(data.about as string, '_p(\"\"\"', '');
            this.buildName = data.buildName as string;
            this.hasSound = !!(data.hasSound) as boolean;
            this.hasMusic = !!(data.hasMusic) as boolean;
            this.hasVoice = !!(data.hasVoice) as boolean;
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
        },
        updateProject(data: ProjectSettings): void {
            this.name = data.name;
            this.showName = data.showName;
            this.version = data.version;
            this.about = data.about;
            this.buildName = data.buildName.replace(/ /g, '');
            this.hasSound = data.hasSound;
            this.hasMusic = data.hasMusic;
            this.hasVoice = data.hasVoice;
            this.transitionEnter = data.transitionEnter;
            this.transitionExit = data.transitionExit;
            this.transitionIntra = data.transitionIntra;
            this.transitionAfterLoad = data.transitionAfterLoad;
            this.transitionEndGame = data.transitionEndGame;
            this.transitionWindowShow = data.transitionWindowShow;
            this.transitionWindowHide = data.transitionWindowHide;
            this.window = data.window;
            this.cps = data.cps;
            this.afm = data.afm;
            this.saveDirectory = data.saveDirectory;
            this.windowIcon = data.windowIcon;
        }
    }
});