import { IScene } from "./interfaces/IScene";
import { IChoice } from "./interfaces/IChoice";
import { IVariable } from "./interfaces/IVariable";
import { Pamyu } from "./Pamyu";
import { EventExecReturn } from "./types/app";
import { EventType, IEvent } from "./interfaces/IEvent";
import { Character } from "./Character";

export class Scene implements IScene {
  public name: string;

  public timeline: IEvent[];

  public timelineIndex = 0;

  private readonly chapter: number | string;

  private readonly scene: number | string;

  public constructor(
    name: string,
    chapter: number | string,
    scene: number | string
  ) {
    this.name = name;
    this.timeline = [];
    this.chapter = chapter;
    this.scene = scene;
  }

  public async execNext(): Promise<EventExecReturn> {
    if (this.timelineIndex >= this.timeline.length)
      return {
        index: this.timelineIndex,
        event: null,
        continueTimeline: false,
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
      continueTimeline: continueTimeline,
    };
  }

  public changeBackground(background: string): IScene {
    this.addAction({
      type: EventType.ChangeBackground,
      data: {
        background,
      },
      exec: async (): Promise<boolean> => {
        await Pamyu.i.assetManager.setBackground(background, 500);
        return true;
      },
    } as IEvent);

    return this;
  }

  public choice(
    character: Character,
    message: string,
    choices: IChoice[],
    expression?: unknown
  ): IScene {
    this.addAction({
      type: EventType.Choice,
      data: {
        message,
        choices,
      },
      exec: async (): Promise<boolean> => {
        this.setExpression(character, expression);
        console.error("Choice not implemented");
        return true;
      },
    } as IEvent);

    return this;
  }

  public goto(scene: string): IScene {
    this.addAction({
      type: EventType.Goto,
      data: {
        scene,
      },
      exec: async (): Promise<boolean> => {
        console.error("Goto not implemented");
        return true;
      },
    } as IEvent);

    return this;
  }

  public join(
    character: Character,
    position: number,
    expression?: unknown
  ): IScene {
    this.addAction({
      type: EventType.Join,
      data: {
        character,
        position,
      },
      exec: async (): Promise<boolean> => {
        this.setExpression(character, expression);
        character.setVisible(true);
        console.warn("Join not completly implemented");
        return true;
      },
    } as IEvent);

    return this;
  }

  public leave(character: Character): IScene {
    this.addAction({
      type: EventType.Leave,
      data: {
        character,
      },
      exec: async (): Promise<boolean> => {
        character.setVisible(false);
        console.warn("Leave not completly implemented");
        return true;
      },
    } as IEvent);

    return this;
  }

  public msg(
    character: Character,
    message: string,
    thinking: boolean,
    expression?: unknown
  ): IScene {
    this.addAction({
      type: EventType.Msg,
      data: {
        character,
        message,
      },
      exec: async (): Promise<boolean> => {
        this.setExpression(character, expression);
        await Pamyu.i.messageManager.showMessage(
          character,
          `ch${this.chapter}.sc${this.scene}.${message}`,
          thinking
        );

        return false;
      },
    } as IEvent);

    return this;
  }

  public think(
    character: Character,
    message: string,
    expression?: unknown
  ): IScene {
    this.msg(character, message, true, expression);

    return this;
  }

  public talk(
    character: Character,
    message: string,
    expression?: unknown
  ): IScene {
    this.msg(character, message, false, expression);

    return this;
  }

  public save(): IScene {
    this.addAction({
      type: EventType.Save,
      data: {
        scene: this.name,
      },
      exec: async (): Promise<boolean> => {
        console.error("Save not implemented");
        return true;
      },
    } as IEvent);

    return this;
  }

  public setAchievement(achievement: string): IScene {
    this.addAction({
      type: EventType.SetAchievement,
      data: {
        achievement,
      },
      exec: async (): Promise<boolean> => {
        console.error("Set achievement not implemented");
        return true;
      },
    } as IEvent);

    return this;
  }

  public variable(
    action: keyof IVariable,
    name: string,
    value?: unknown
  ): IScene {
    this.addAction({
      type: EventType.Save,
      data: {
        action,
        name,
        value,
      },
      exec: async (): Promise<boolean> => {
        console.error("Variable not implemented");
        return true;
      },
    } as IEvent);

    return this;
  }

  public setExpression(character: Character, expression?: unknown): IScene {
    if (!Boolean(expression)) return this;
    if (typeof expression === "string") character.setExpression(expression);
    return this;
  }

  private addAction(event: IEvent): IScene {
    this.timeline.push(event);

    return this;
  }
}
