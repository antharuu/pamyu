import {Character} from "../../Character";

export interface IMessageManager {
    hasBoxVisible: boolean;

    showBox(): Promise<void>;

    hideBox(): Promise<void>;

    showMessage(character: Character, message: string, thinking: boolean): Promise<void>;
}