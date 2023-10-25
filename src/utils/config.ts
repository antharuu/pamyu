// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {ConfigItem, ScriptVar} from '../types/globals.ts';

export class Config {
    private static configKeys: ConfigItem[] = [
        {name: 'name', key: 'name', type: 'string', unwrap: true, prefix: '_("', suffix: '")'},
        {name: 'showName', key: 'gui.show_name', type: 'boolean'},
        {name: 'version', key: 'config.version', type: 'string'},
        {name: 'about', key: 'gui.about', type: 'noQuotes', unwrap: true, prefix: '_p("""\n', suffix: '\n""")'},
        {name: 'buildName', key: 'build.name', type: 'string'},
        {name: 'hasSound', key: 'config.has_sound', type: 'boolean'},
        {name: 'hasMusic', key: 'config.has_music', type: 'boolean'},
        {name: 'hasVoice', key: 'config.has_voice', type: 'boolean'},
        {name: 'transitionEnter', key: 'config.enter_transition', type: 'noQuotes'},
        {name: 'transitionExit', key: 'config.exit_transition', type: 'noQuotes'},
        {name: 'transitionIntra', key: 'config.intra_transition', type: 'noQuotes'},
        {name: 'transitionAfterLoad', key: 'config.after_load_transition', type: 'noQuotes'},
        {name: 'transitionEndGame', key: 'config.end_game_transition', type: 'noQuotes'},
        {name: 'transitionWindowShow', key: 'config.window_show_transition', type: 'noQuotes'},
        {name: 'transitionWindowHide', key: 'config.window_hide_transition', type: 'noQuotes'},
        {name: 'window', key: 'config.window', type: 'string'},
        {name: 'cps', key: 'preferences.text_cps', type: 'number'},
        {name: 'afm', key: 'preferences.afm_time', type: 'number'},
        {name: 'saveDirectory', key: 'config.save_directory', type: 'string'},
        {name: 'windowIcon', key: 'config.window_icon', type: 'string'}
    ];

    static getConfigFromName(name: string): ConfigItem | undefined {
        return this.configKeys.find(k => k.name === name);
    }

    static getKeyFromName(name: string): string | undefined {
        return this.configKeys.find(k => k.name === name)?.key;
    }

    static getNameFromKey(key: string): string | undefined {
        return this.configKeys.find(k => k.key === key)?.name;
    }

    static get getNames(): string[] {
        return this.configKeys.map(k => k.name) ?? [];
    }

    static get getKeys(): string[] {
        return this.configKeys.map(k => k.key) ?? [];
    }

    static getTypeFromName(name: string): ScriptVar {
        return this.configKeys.find(k => k.name === name)?.type;
    }

    public static getValue(name: string, value: ScriptVar): ScriptVar {
        if (typeof value === 'string') {
            return this.getString(name, value);
        }

        return value;
    }

    private static getString(name: string, value: string): string {
        const config = this.getConfigFromName(name);

        if (config?.unwrap) {
            value = this.unwrapPrefix(config, value);
            value = this.unwrapSuffix(config, value);

            return value;
        }

        return value;
    }

    private static unwrapPrefix(config: ConfigItem, value: string): string {
        const prefix = config.prefix ?? '';

        if (value.startsWith(prefix)) {
            value = value.slice(prefix.length);
        }

        return value;
    }

    private static unwrapSuffix(config: ConfigItem, value: string): string {
        const suffix = config.suffix ?? '';

        if (value.endsWith(suffix)) {
            value = value.slice(0, -suffix.length);
        }

        return value;
    }
}