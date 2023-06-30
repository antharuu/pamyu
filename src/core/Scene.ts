import {IScene} from "./interfaces/IScene";
import {IChoice} from "./interfaces/IChoice";
import {IVariable} from "./interfaces/IVariable";
import {App} from "./App";
import {EventExecReturn} from "./types/app";
import {EventType, IEvent} from "./interfaces/IEvent";
import {Character} from "./Character";

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

    choice(character: Character, message: string, choices: IChoice[], expression?: any): IScene {
        this.addAction({
            type: EventType.Choice,
            data: {
                message,
                choices
            },
            exec: async (): Promise<boolean> => {
                this.setExpression(character, expression);
                console.error("Choice not implemented");
                return true;
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
                console.error("Goto not implemented");
                return true;
            }
        } as IEvent);

        return this;
    }

    join(character: Character, position: number, expression?: any): IScene {
        this.addAction({
            type: EventType.Join,
            data: {
                character,
                position
            },
            exec: async (): Promise<boolean> => {
                this.setExpression(character, expression);
                character.setVisible(true);
                console.warn("Join not completly implemented");
                return true;
            }
        } as IEvent);

        return this;
    }

    leave(character: Character): IScene {
        this.addAction({
            type: EventType.Leave,
            data: {
                character
            },
            exec: async (): Promise<boolean> => {
                character.setVisible(false);
                console.warn("Leave not completly implemented");
                return true;
            }
        } as IEvent);

        return this;
    }

    msg(character: Character, message: string, thinking: boolean, expression?: any): IScene {
        this.addAction({
            type: EventType.Msg,
            data: {
                character,
                message
            },
            exec: async (): Promise<boolean> => {
                this.setExpression(character, expression);
                await App.i.messageManager
                    .showMessage(character, `ch${this.chapter}.sc${this.scene}.${message}`, thinking);

                return false;
            }
        } as IEvent);

        return this;
    }

    think(character: Character, message: string, expression?: any): IScene {
        this.msg(character, message, true, expression);

        return this;
    }

    talk(character: Character, message: string, expression?: any): IScene {
        this.msg(character, message, false, expression);

        return this;
    }

    save(): IScene {
        this.addAction({
            type: EventType.Save,
            data: {
                scene: this.name
            },
            exec: async (): Promise<boolean> => {
                console.error("Save not implemented");
                return true;
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
                console.error("Set achievement not implemented");
                return true;
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
                console.error("Variable not implemented");
                return true;
            }
        } as IEvent)

        return this;
    }

    setExpression(character: Character, expression?: any): IScene {
        if (!expression) return this;
        if (typeof expression === "string") character.setExpression(expression);
        return this;
    }
}