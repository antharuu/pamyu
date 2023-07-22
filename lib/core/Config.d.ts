import { IConfig } from "./interfaces/IConfig";
export declare class Config implements IConfig {
    pamyuVersion: string;
    pamyuDevEnv: boolean;
    transitionSpeed: number;
    messageSpeed: number;
    translation: null;
    defaultLanguage: string;
    sides: string[];
    positions: number;
    importBaseStyles: boolean;
    constructor(config: Partial<IConfig>);
    getTransitionSpeed: () => number;
    getMessageSpeed: () => number;
}
