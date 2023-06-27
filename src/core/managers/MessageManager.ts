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
        return new Promise(async (resolve) => {
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
            this.textElement.appendChild(messageElement);

            // Utilisez la méthode typeMessage pour afficher le message lettre par lettre
            await this.typeMessage(messageElement, Translation.i.translate(message), 20);

            resolve();
        });
    }

    private async typeMessage(element: HTMLElement, message: string, delay: number) {
        for (let i = 0; i < message.length; i++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            element.innerHTML += message[i] === ' ' ? '&nbsp;' : message[i];
            element.innerHTML = element.innerHTML.replace(/&nbsp;/g, ' ');
        }
    }
}