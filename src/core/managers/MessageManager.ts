import {IMessageManager} from "../interfaces/managers/IMessageManager";
import {Translation} from "../Translation";
import {slugify} from "../utils/string";
import {Character} from "../Character";

export class MessageManager implements IMessageManager {
    public hasBoxVisible: boolean = false;

    private readonly boxElement: HTMLDivElement | null = null;
    private readonly textElement: HTMLDivElement | null = null;

    private _isTyping: boolean = false;
    private messageElement: HTMLSpanElement | null = null;
    private currentMessage: string = "";
    private currentIndex: number = 0;
    private intervalId: number | null = null;

    set isTyping(value: boolean) {
        this._isTyping = value;
    }

    constructor() {
        this.boxElement = document.querySelector<HTMLDivElement>("#message-box");
        this.textElement = document.querySelector<HTMLDivElement>("#text-box");
    }

    hideBox(): Promise<void> {
        this.boxElement?.classList.remove("visible");
        this.hasBoxVisible = false;

        // wait .5s
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    showBox(): Promise<void> {
        this.boxElement?.classList.add("visible");
        this.hasBoxVisible = true;

        // wait .5s
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    showMessage(character: Character, message: string, thinking: boolean): Promise<void> {
        if (this._isTyping) {
            this.stopTyping(true);
            return Promise.resolve();
        }

        if (!this.hasBoxVisible) {
            return this.showBox()
                .then(() => this.printMessage(character, message, thinking));
        } else {
            return this.printMessage(character, message, thinking);
        }
    }


    private printMessage(character: Character, message: string, thinking: boolean): Promise<void> {
        return new Promise(async (resolve) => {
            if (this.textElement === null) {
                throw new Error("Text element not found.");
            }

            if (this._isTyping) {
                this.stopTyping();
                return resolve();
            }

            this.textElement.innerHTML = "";

            const characterElement = document.createElement("span");
            characterElement.classList.add("character");
            characterElement.classList.add("character--" + slugify(character.getName(false)));
            characterElement.style.setProperty("--character-color", character.getColor());
            characterElement.innerText = character.getName(thinking);
            this.textElement.appendChild(characterElement);

            this.messageElement = document.createElement("span");
            this.messageElement.classList.add("message");
            this.textElement.appendChild(this.messageElement);

            // Utilisez la méthode typeMessage pour afficher le message lettre par lettre
            await this.typeMessage(Translation.i.translate(message), 20);
            resolve();
        });
    }

    private typeMessage(message: string, delay: number) {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        this.isTyping = true;
        this.currentMessage = message;
        this.currentIndex = 0;

        this.intervalId = setInterval(() => {
            this.showVisibleText();
            this.currentIndex = Math.min(this.currentIndex + 1, this.currentMessage.length);

            if (this.currentIndex >= this.currentMessage.length) {
                this.stopTyping();
            }
        }, delay);
    }

    private showVisibleText() {
        if (this.messageElement === null) {
            throw new Error("Message element not found.");
        }

        this.messageElement.innerHTML += this.currentMessage[this.currentIndex] === ' '
            ? '&nbsp;'
            : this.currentMessage[this.currentIndex];
        this.messageElement.innerHTML = this.messageElement.innerHTML.replace(/&nbsp;/g, ' ');
    }

    private stopTyping(immediate: boolean = false) {
        if (this.intervalId) {
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
}