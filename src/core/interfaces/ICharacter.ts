export default interface ICharacter {
  name: string;
  color: string;
  isDemon: boolean;
  allowedExpressions: string[];
  visible: boolean;
  position: number;
  expression: string;

  getName(isThinking: boolean): string;

  getColor(): string;

  getIsDemon(): boolean;

  getVisible(): boolean;

  getPosition(): number;

  getExpression(): string;

  setVisible(visible: boolean): ICharacter;

  setPosition(position: number): ICharacter;

  setExpression(expression: string): ICharacter;
}
