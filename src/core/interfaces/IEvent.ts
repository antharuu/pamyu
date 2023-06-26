import {IChoice} from "./IChoice";
import {IVariable} from "./IVariable";

export enum EventType {
    Msg = "msg",
    Choice = "choice",
    Join = "join",
    Goto = "goto",
    ChangeBackground = "changeBackground",
    SetAchievement = "setAchievement",
    Save = "save",
    Variable = "variable"
}

export type MsgData = {
    character: string;
    message: string;
}

export type ChoiceData = {
    message: string;
    choices: IChoice[];
}

export type JoinData = {
    character: string;
    position: number;
}

export type GotoData = {
    scene: string;
}

export type ChangeBackgroundData = {
    background: string;
}

export type SetAchievementData = {
    achievement: string;
}

export type SaveData = {
    scene: string;
}

export type VariableData = {
    action: keyof IVariable;
    name: string;
    value?: any;
}

export type EventData = MsgData
    | ChoiceData
    | JoinData
    | GotoData
    | ChangeBackgroundData
    | SetAchievementData
    | SaveData
    | VariableData;

export interface IEvent {
    type: EventType;

    data: EventData;

    exec: () => Promise<any>;
}