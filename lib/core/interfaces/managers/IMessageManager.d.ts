import { Character } from "../../Character";
export interface IMessageManager {
    hasBoxVisible: boolean;
    toggleBox(state?: boolean): Promise<void>;
    showMessage(character: Character, message: string, thinking: boolean): Promise<void>;
}
