import { Translation } from "../Translation";
import { slugify } from "../utils/string";
import { Pamyu } from "../Pamyu";
export class MessageManager {
    constructor() {
        this.hasBoxVisible = false;
        this.boxElement = null;
        this.textElement = null;
        this.isTyping = false;
        this.messageElement = null;
        this.currentMessage = "";
        this.currentIndex = 0;
        this.intervalId = null;
        this.boxElement = document.querySelector(".pamyu__message-box");
        this.textElement =
            document.querySelector(".pamyu__text-box");
    }
    // Toggles the message box visibility
    async toggleBox(state) {
        this.changeBoxVisibility(typeof state === "undefined" ? this.hasBoxVisible : state);
    }
    // Shows a message in the message box
    async showMessage(character, message, isThinking) {
        if (this.isTyping) {
            this.stopTyping(true);
            return;
        }
        if (!this.hasBoxVisible) {
            await this.toggleBox(true);
        }
        await this.printMessage(character, message, isThinking);
    }
    async printMessage(character, message, isThinking) {
        if (this.textElement === null) {
            throw new Error("Text element not found.");
        }
        if (this.isTyping) {
            this.stopTyping();
        }
        this.clearTextElement();
        const characterElement = this.createCharacterElement(character, isThinking);
        this.textElement.appendChild(characterElement);
        this.messageElement = this.createMessageElement();
        this.textElement.appendChild(this.messageElement);
        this.typeMessage(Translation.useTranslation ? Translation.i.translate(message) : message, Pamyu.config.messageSpeed);
    }
    typeMessage(message, delay) {
        this.resetTypingState(message);
        this.intervalId = setInterval(() => {
            this.showVisibleText();
            this.currentIndex = Math.min(this.currentIndex + 1, this.currentMessage.length);
            if (this.currentIndex >= this.currentMessage.length) {
                this.stopTyping();
            }
        }, delay);
    }
    stopTyping(immediate = false) {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            if (this.messageElement === null) {
                throw new Error("Message element not found.");
            }
            if (immediate) {
                this.messageElement.innerHTML = this.currentMessage;
            }
        }
        this.isTyping = false;
    }
    changeBoxVisibility(visible) {
        this.hasBoxVisible = visible;
        this.boxElement?.classList.toggle("visible", visible);
    }
    clearTextElement() {
        if (!this.textElement)
            return;
        this.textElement.innerHTML = "";
    }
    createCharacterElement(character, isThinking) {
        const characterElement = document.createElement("span");
        characterElement.classList.add("character", `character--${slugify(character.getName(false))}`);
        characterElement.style.setProperty("--character-color", character.getColor());
        characterElement.innerText = character.getName(isThinking);
        return characterElement;
    }
    createMessageElement() {
        const messageElement = document.createElement("span");
        messageElement.classList.add("message");
        return messageElement;
    }
    resetTypingState(message) {
        this.stopTyping();
        this.isTyping = true;
        this.currentMessage = message;
        this.currentIndex = 0;
    }
    showVisibleText() {
        if (this.messageElement === null) {
            throw new Error("Message element not found.");
        }
        this.messageElement.innerHTML +=
            this.currentMessage[this.currentIndex] === " "
                ? "&nbsp;"
                : this.currentMessage[this.currentIndex];
        this.messageElement.innerHTML = this.messageElement.innerHTML.replace(/&nbsp;/g, " ");
    }
}
//# sourceMappingURL=MessageManager.js.map