import { IConfig } from "./interfaces/IConfig";
export declare class Config implements IConfig {
    transitionSpeed: number;
    messageSpeed: number;
    translationFile: string;
    constructor(config: Partial<IConfig>);
    getTransitionSpeed: () => number;
    getMessageSpeed: () => number;
}
