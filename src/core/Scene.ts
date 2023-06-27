import {IScene} from "./interfaces/IScene";
import {IChoice} from "./interfaces/IChoice";
import {IVariable} from "./interfaces/IVariable";
import {App} from "./App";
import {EventExecReturn} from "./types/app";
import {EventType, IEvent} from "./interfaces/IEvent";

export class Scene implements IScene {
    name: string;
    timeline: IEvent[];
    timelineIndex: number = 0;

    chapter: number | string;
    scene: number | string;

    constructor(name: string, chapter: number | string, scene: number | string) {
        this.name = name;
        this.timeline = [];
        this.chapter = chapter;
        this.scene = scene;
    }

    private addAction(event: IEvent): IScene {
        this.timeline.push(event);

        return this;
    }

    async execNext(): Promise<EventExecReturn> {
        if (this.timelineIndex >= this.timeline.length) return {
            index: this.timelineIndex,
            event: null,
            continueTimeline: false
        };

        const event = this.timeline[this.timelineIndex];
        let continueTimeline: boolean;

        try {
            continueTimeline = await event.exec();
        } catch (e) {
            console.error(e);
            continueTimeline = true;
        }

        this.timelineIndex++;

        return {
            index: this.timelineIndex,
            event,
            continueTimeline: continueTimeline
        }
    }

    changeBackground(background: string): IScene {
        this.addAction({
            type: EventType.ChangeBackground,
            data: {
                background
            },
            exec: async (): Promise<boolean> => {
                await App.i.assetManager.setBackground(background, 500);
                return true;
            }
        } as IEvent);

        return this;
    }

    choice(message: string, choices: IChoice[]): IScene {
        this.addAction({
            type: EventType.Choice,
            data: {
                message,
                choices
            },
            exec: async (): Promise<boolean> => {
                throw new Error("Choice not implemented");
            }
        } as IEvent);

        return this;
    }

    goto(scene: string): IScene {
        this.addAction({
            type: EventType.Goto,
            data: {
                scene
            },
            exec: async (): Promise<boolean> => {
                throw new Error("Goto not implemented");
            }
        } as IEvent);

        return this;
    }

    join(character: string, position: number): IScene {
        this.addAction({
            type: EventType.Join,
            data: {
                character,
                position
            },
            exec: async (): Promise<boolean> => {
                throw new Error("Join not implemented");
            }
        } as IEvent);

        return this;
    }

    msg(character: string, message: string): IScene {
        this.addAction({
            type: EventType.Msg,
            data: {
                character,
                message
            },
            exec: async (): Promise<boolean> => {
                await App.i.messageManager
                    .showMessage(character, `ch${this.chapter}.sc${this.scene}.${message}`);

                return false;
            }
        } as IEvent);

        return this;
    }

    save(): IScene {
        this.addAction({
            type: EventType.Save,
            data: {
                scene: this.name
            },
            exec: async (): Promise<boolean> => {
                throw new Error("Save not implemented");
            }
        } as IEvent)

        return this;
    }

    setAchievement(achievement: string): IScene {
        this.addAction({
            type: EventType.SetAchievement,
            data: {
                achievement
            },
            exec: async (): Promise<boolean> => {
                throw new Error("Set achievement not implemented");
            }
        } as IEvent)

        return this;
    }

    variable(action: keyof IVariable, name: string, value?: any): IScene {
        this.addAction({
            type: EventType.Save,
            data: {
                action,
                name,
                value
            },
            exec: async (): Promise<boolean> => {
                throw new Error("Variable not implemented");
            }
        } as IEvent)

        return this;
    }
}