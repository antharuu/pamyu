var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Translation } from "../Translation";
import { slugify } from "../utils/string";
import Pamyu from "../Pamyu";
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
        this.boxElement = document.querySelector("#message-box");
        this.textElement = document.querySelector("#text-box");
    }
    // Toggles the message box visibility
    toggleBox(state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.changeBoxVisibility(typeof state === "undefined" ? this.hasBoxVisible : state);
        });
    }
    // Shows a message in the message box
    showMessage(character, message, isThinking) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isTyping) {
                this.stopTyping(true);
                return;
            }
            if (!this.hasBoxVisible) {
                yield this.toggleBox(true);
            }
            yield this.printMessage(character, message, isThinking);
        });
    }
    printMessage(character, message, isThinking) {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.typeMessage(Translation.i.translate(message), Pamyu.config.messageSpeed);
        });
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
        var _a;
        this.hasBoxVisible = visible;
        (_a = this.boxElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("visible", visible);
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
