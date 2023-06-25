export enum Position {
    Left = 'left',
    Left2 = 'left2',
    Left3 = 'left3',
    Center = 'center',
    Right = 'right',
    Right2 = 'right2',
    Right3 = 'right3',
}

export enum Side {
    Default = 'default',
    Inverted = 'inverted',
}

export interface ICharacter {
    id: string;
    name: string;
    color?: string;
    expressions: Map<string, string>;
    currentExpression: string;
    position: Position;
    side: Side;

    setExpression(expression: string): ICharacter;

    setPosition(position: Position): ICharacter;

    setSide(side: Side): ICharacter;

    setColor(color: string): ICharacter;
}