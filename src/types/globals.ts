export type Color = string;

export type ScriptVar = string | number | boolean | null |undefined;

export type ProjectSettings = {
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
    };