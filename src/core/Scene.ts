import {IScene} from "./interfaces/IScene";
import {EventType, IEvent} from "./interfaces/IEvent";
import {IChoice} from "./interfaces/IChoice";
import {IVariable} from "./interfaces/IVariable";
import {App} from "./App";

export class Scene implements IScene {
    name: string;
    timeline: IEvent[];
    timelineIndex: number = 0;

    constructor(name: string) {
        this.name = name;
        this.timeline = [];
    }

    private addAction(event: IEvent): IScene {
        this.timeline.push(event);

        return this;
    }

    async execNext(): Promise<{ index: number; event: IEvent | null; }> {
        if (this.timelineIndex >= this.timeline.length) return {
            index: this.timelineIndex,
            event: null
        };

        const event = this.timeline[this.timelineIndex];

        try {
            await event.exec();
        } catch (e) {
            console.error(e);
        }

        this.timelineIndex++;

        return {
            index: this.timelineIndex,
            event
        }
    }

    changeBackground(background: string): IScene {
        this.addAction({
            type: EventType.ChangeBackground,
            data: {
                background
            },
            exec: async () => {
                App.i.assetManager.setBackground(background, 500);
            }
        })

        return this;
    }

    choice(message: string, choices: IChoice[]): IScene {
        this.addAction({
            type: EventType.Choice,
            data: {
                message,
                choices
            },
            exec: async () => {
                throw new Error("Choice not implemented");
            }
        });

        return this;
    }

    goto(scene: string): IScene {
        this.addAction({
            type: EventType.Goto,
            data: {
                scene
            },
            exec: async () => {
                throw new Error("Goto not implemented");
            }
        });

        return this;
    }

    join(character: string, position: number): IScene {
        this.addAction({
            type: EventType.Join,
            data: {
                character,
                position
            },
            exec: async () => {
                throw new Error("Join not implemented");
            }
        });

        return this;
    }

    msg(character: string, message: string): IScene {
        this.addAction({
            type: EventType.Msg,
            data: {
                character,
                message
            },
            exec: async () => {
                throw new Error("Msg not implemented");
            }
        });

        return this;
    }

    save(): IScene {
        this.addAction({
            type: EventType.Save,
            data: {
                scene: this.name
            },
            exec: async () => {
                throw new Error("Save not implemented");
            }
        })

        return this;
    }

    setAchievement(achievement: string): IScene {
        this.addAction({
            type: EventType.SetAchievement,
            data: {
                achievement
            },
            exec: async () => {
                throw new Error("Set achievement not implemented");
            }
        })

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
            exec: async () => {
                throw new Error("Variable not implemented");
            }
        })

        return this;
    }
}