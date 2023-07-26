import IConfig from "./interfaces/IConfig";
export declare class Config implements IConfig {
    pamyuVersion: string;
    pamyuDevEnv: boolean;
    transitionSpeed: number;
    messageSpeed: number;
    translation: null;
    defaultLanguage: string;
    sides: string[];
    positions: {
        [key: string]: number;
    } | string[];
    importBaseStyles: boolean;
    thinkCharacters: [string, string] | {
        prefix?: string;
        suffix?: string;
    };
    constructor(config: Partial<IConfig>);
    getTransitionSpeed: () => number;
    getMessageSpeed: () => number;
}
