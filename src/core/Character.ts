import { CharacterOptions } from "./types/app";
import { ICharacter } from "./interfaces/ICharacter";
import { Pamyu } from "./Pamyu";

export class Character implements ICharacter {
  public readonly name: string;

  public readonly color: string;

  public readonly isDemon: boolean;

  public readonly allowedExpressions: string[] = [];

  public visible = true;

  public position = 0;

  public expression = "normal";

  public constructor(name: string, options: CharacterOptions) {
    this.name = name;
    this.color = options.color ?? "#F3ECF3";
    this.isDemon = options.isDemon ?? false;

    if (options.expressions == "*") {
      this.allowedExpressions = Pamyu.i.assetManager.getExpressions();
    } else {
      this.allowedExpressions = Array.isArray(options.expressions)
        ? options.expressions
        : ["normal"];
    }

    Pamyu.i.assetManager.registerExpressions(this);
  }

  public getName = (isThinking: boolean): string => {
    if (isThinking) return `( ${this.name} )`;
    return this.name;
  };

  public getColor = (): string => this.color;

  public getIsDemon = (): boolean => this.isDemon;

  public getVisible = (): boolean => this.visible;

  public getPosition = (): number => this.position;

  public getExpression = (): string => this.expression;

  public setVisible = (visible: boolean): ICharacter => {
    this.visible = visible;

    return this;
  };

  public setPosition = (position: number): ICharacter => {
    this.position = position;

    return this;
  };

  public setExpression = (expression: string): ICharacter => {
    if (this.allowedExpressions.includes(expression)) {
      if (this.expression !== expression) this.expression = expression;
    } else {
      console.error(
        `Character ${this.name} does not have expression ${expression}`
      );
    }

    return this;
  };
}
