export default interface ICharacter {
    name: string;
    color: string;
    isDemon: boolean;
    visible: boolean;
    position: number;
    getName(isThinking: boolean): string;
    getColor(): string;
    getIsDemon(): boolean;
    getVisible(): boolean;
    getPosition(): number;
    setVisible(visible: boolean): ICharacter;
    setPosition(position: number): ICharacter;
    setSprite(sprite: string | undefined): ICharacter;
    getSprite(): string | undefined;
}
