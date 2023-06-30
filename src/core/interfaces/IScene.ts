import {IVariable} from "./IVariable";
import {IEvent} from "./IEvent";
import {IChoice} from "./IChoice";
import {EventExecReturn} from "../types/app";
import {Character} from "../Character";

export interface IScene {
    name: string;

    timeline: IEvent[];

    timelineIndex: number;

    execNext(): Promise<EventExecReturn>;

    save(): IScene;

    setAchievement(achievement: string): IScene;

    changeBackground(background: string): IScene;

    msg(character: Character, message: string, thinking: boolean, expression?: any): IScene;

    think(character: Character, message: string, expression?: any): IScene;

    talk(character: Character, message: string, expression?: any): IScene;

    join(character: Character, position: number, expression?: any): IScene;

    leave(character: Character): IScene;

    choice(character: Character, message: string, choices: IChoice[], expression?: any): IScene;

    goto(scene: string): IScene;

    variable(action: keyof IVariable, name: string, value?: any): IScene;

    setExpression(character: Character, expression: object): IScene;
}