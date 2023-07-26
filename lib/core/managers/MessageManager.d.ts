import IMessageManager from "../interfaces/managers/IMessageManager";
import Character from "../Character";
export default class MessageManager implements IMessageManager {
    hasBoxVisible: boolean;
    private readonly boxElement;
    private readonly textElement;
    private isTyping;
    private messageElement;
    private currentMessage;
    private currentIndex;
    private intervalId;
    constructor();
    toggleBox(state?: boolean): Promise<void>;
    showMessage(character: Character, message: string, isThinking: boolean): Promise<void>;
    private printMessage;
    private typeMessage;
    private stopTyping;
    private changeBoxVisibility;
    private clearTextElement;
    private createCharacterElement;
    private createMessageElement;
    private resetTypingState;
    private showVisibleText;
}
