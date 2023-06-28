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

    msg(character: Character, message: string, thinking: boolean): IScene;

    think(character: Character, message: string): IScene;

    talk(character: Character, message: string): IScene;

    join(character: Character, position: number): IScene;

    choice(message: string, choices: IChoice[]): IScene;

    goto(scene: string): IScene;

    variable(action: keyof IVariable, name: string, value?: any): IScene;
}