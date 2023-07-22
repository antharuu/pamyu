import { IMessageManager } from "../interfaces/managers/IMessageManager";
import { Translation } from "../Translation";
import { slugify } from "../utils/string";
import { Character } from "../Character";
import { Pamyu } from "../Pamyu";

export class MessageManager implements IMessageManager {
  public hasBoxVisible = false;

  private readonly boxElement: HTMLDivElement | null = null;

  private readonly textElement: HTMLDivElement | null = null;

  private isTyping = false;

  private messageElement: HTMLSpanElement | null = null;

  private currentMessage = "";

  private currentIndex = 0;

  private intervalId: number | null = null;

  public constructor() {
    this.boxElement = document.querySelector<HTMLDivElement>("#message-box");
    this.textElement = document.querySelector<HTMLDivElement>("#text-box");
  }

  // Toggles the message box visibility
  public async toggleBox(state?: boolean): Promise<void> {
    this.changeBoxVisibility(
      typeof state === "undefined" ? this.hasBoxVisible : state
    );
  }

  // Shows a message in the message box
  public async showMessage(
    character: Character,
    message: string,
    isThinking: boolean
  ): Promise<void> {
    if (this.isTyping) {
      this.stopTyping(true);
      return;
    }

    if (!this.hasBoxVisible) {
      await this.toggleBox(true);
    }

    await this.printMessage(character, message, isThinking);
  }

  private async printMessage(
    character: Character,
    message: string,
    isThinking: boolean
  ): Promise<void> {
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

    this.typeMessage(
      Translation.i.translate(message),
      Pamyu.config.messageSpeed
    );
  }

  private typeMessage(message: string, delay: number): void {
    this.resetTypingState(message);

    this.intervalId = setInterval(() => {
      this.showVisibleText();
      this.currentIndex = Math.min(
        this.currentIndex + 1,
        this.currentMessage.length
      );

      if (this.currentIndex >= this.currentMessage.length) {
        this.stopTyping();
      }
    }, delay);
  }

  private stopTyping(immediate = false): void {
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

  private changeBoxVisibility(visible: boolean): void {
    this.hasBoxVisible = visible;
    this.boxElement?.classList.toggle("visible", visible);
  }

  private clearTextElement(): void {
    if (!this.textElement) return;
    this.textElement.innerHTML = "";
  }

  private createCharacterElement(
    character: Character,
    isThinking: boolean
  ): HTMLSpanElement {
    const characterElement = document.createElement("span");
    characterElement.classList.add(
      "character",
      `character--${slugify(character.getName(false))}`
    );
    characterElement.style.setProperty(
      "--character-color",
      character.getColor()
    );
    characterElement.innerText = character.getName(isThinking);

    return characterElement;
  }

  private createMessageElement(): HTMLSpanElement {
    const messageElement = document.createElement("span");
    messageElement.classList.add("message");

    return messageElement;
  }

  private resetTypingState(message: string): void {
    this.stopTyping();
    this.isTyping = true;
    this.currentMessage = message;
    this.currentIndex = 0;
  }

  private showVisibleText(): void {
    if (this.messageElement === null) {
      throw new Error("Message element not found.");
    }

    this.messageElement.innerHTML +=
      this.currentMessage[this.currentIndex] === " "
        ? "&nbsp;"
        : this.currentMessage[this.currentIndex];
    this.messageElement.innerHTML = this.messageElement.innerHTML.replace(
      /&nbsp;/g,
      " "
    );
  }
}
