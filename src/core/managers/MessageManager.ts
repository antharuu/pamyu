import {IMessageManager} from "../interfaces/managers/IMessageManager";
import {Translation} from "../Translation";
import {slugify} from "../utils/string";

export class MessageManager implements IMessageManager {
    private readonly boxElement: HTMLDivElement | null = null;
    private readonly textElement: HTMLDivElement | null = null;

    hasBoxVisible: boolean = false;

    constructor() {
        this.boxElement = document.querySelector<HTMLDivElement>("#message-box");
        this.textElement = document.querySelector<HTMLDivElement>("#text-box");
    }

    hideBox(): Promise<void> {
        console.log("hide box");
        this.boxElement?.classList.remove("visible");
        this.hasBoxVisible = false;

        // wait .5s
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    showBox(): Promise<void> {
        console.log("show box");
        this.boxElement?.classList.add("visible");
        this.hasBoxVisible = true;

        // wait .5s
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    showMessage(character: string, message: string): Promise<void> {
        console.log("show message");
        if (!this.hasBoxVisible) {
            return this.showBox()
                .then(() => this.printMessage(character, message));
        } else {
            return this.printMessage(character, message);
        }
    }

    private printMessage(character: string, message: string): Promise<void> {
        return new Promise(resolve => {
            if (this.textElement === null) {
                throw new Error("Text element not found.");
            }

            this.textElement.innerHTML = "";
            const characterElement = document.createElement("span");
            characterElement.classList.add("character");
            characterElement.classList.add("character--" + slugify(character));
            characterElement.innerText = character;
            this.textElement.appendChild(characterElement);

            const messageElement = document.createElement("span");
            messageElement.classList.add("message");
            messageElement.innerText = Translation.i.translate(message);
            this.textElement.appendChild(messageElement);

            resolve();
        });
    }
}