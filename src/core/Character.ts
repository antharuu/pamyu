import { CharacterOptions } from "./types/app";
import ICharacter from "./interfaces/ICharacter";
import Pamyu from "./Pamyu";

export default class Character implements ICharacter {
  public readonly name: string;

  public readonly color: string;

  public readonly isDemon: boolean;

  public visible = true;

  public position = 0;

  private sprite: string | undefined;

  public constructor(name: string, options: CharacterOptions = {}) {
    this.name = name;
    this.color = options.color ?? "#F3ECF3";
    this.isDemon = options.isDemon ?? false;
  }

  public getName = (isThinking: boolean): string => {
    const { prefix, suffix } = this.getThinkCharacters();
    if (isThinking) return prefix + this.name + suffix;
    return this.name;
  };

  public getColor = (): string => this.color;

  public getIsDemon = (): boolean => this.isDemon;

  public getVisible = (): boolean => this.visible;

  public getPosition = (): number => this.position;

  public setSprite(expression: string | undefined): ICharacter {
    this.sprite = expression;

    return this;
  }

  public getSprite(): string | undefined {
    return this.sprite;
  }

  public setVisible = (visible: boolean): ICharacter => {
    this.visible = visible;

    return this;
  };

  public setPosition = (position: number): ICharacter => {
    this.position = position;

    return this;
  };

  private getThinkCharacters(): { prefix: string; suffix: string } {
    let thinkCharacters = Pamyu.config.thinkCharacters;

    if (Array.isArray(thinkCharacters)) {
      thinkCharacters = {
        prefix: thinkCharacters[0],
        suffix: thinkCharacters[1],
      };
    }

    return {
      prefix: thinkCharacters.prefix ?? "",
      suffix: thinkCharacters.suffix ?? "",
    };
  }
}
