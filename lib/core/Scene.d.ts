import { IScene } from "./interfaces/IScene";
import IChoice from "./interfaces/IChoice";
import IVariable from "./interfaces/IVariable";
import { EventExecReturn } from "./types/app";
import { IEvent } from "./interfaces/IEvent";
import Character from "./Character";
export default class Scene implements IScene {
    name: string;
    timeline: IEvent[];
    timelineIndex: number;
    private readonly chapter;
    private readonly scene;
    constructor(name: string, chapter: number | string, scene: number | string);
    execNext(): Promise<EventExecReturn>;
    changeBackground(background: string): IScene;
    choice(character: Character, message: string, choices: IChoice[], expression?: string): IScene;
    goto(scene: string): IScene;
    join(character: Character, position: number | string, expression?: string): IScene;
    leave(character: Character): IScene;
    msg(character: Character, message: string, thinking: boolean, expression?: string): IScene;
    think(character: Character, message: string, expression?: string): IScene;
    talk(character: Character, message: string, expression?: string): IScene;
    save(): IScene;
    setAchievement(achievement: string): IScene;
    variable(action: keyof IVariable, name: string, value?: unknown): IScene;
    setExpression(character: Character, expression: string | undefined): IScene;
    private addAction;
}
