import IChoice from "./IChoice";
import IVariable from "./IVariable";
import Character from "../Character";
export declare enum EventType {
    Msg = "msg",
    Choice = "choice",
    Join = "join",
    Leave = "leave",
    Goto = "goto",
    ChangeBackground = "changeBackground",
    SetAchievement = "setAchievement",
    Save = "save",
    Variable = "variable"
}
export type MsgData = {
    character: Character;
    message: string;
};
export type ChoiceData = {
    message: string;
    choices: IChoice[];
};
export type JoinData = {
    character: Character;
    position: number;
};
export type GotoData = {
    scene: string;
};
export type ChangeBackgroundData = {
    background: string;
};
export type SetAchievementData = {
    achievement: string;
};
export type SaveData = {
    scene: string;
};
export type VariableData = {
    action: keyof IVariable;
    name: string;
    value?: unknown;
};
export type EventData = MsgData | ChoiceData | JoinData | GotoData | ChangeBackgroundData | SetAchievementData | SaveData | VariableData;
export interface IEvent {
    type: EventType;
    data: EventData;
    exec: () => Promise<boolean>;
}
