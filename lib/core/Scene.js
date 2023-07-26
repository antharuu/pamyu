import Pamyu from "./Pamyu";
import { EventType } from "./interfaces/IEvent";
export default class Scene {
    constructor(name, chapter, scene) {
        this.timelineIndex = 0;
        this.name = name;
        this.timeline = [];
        this.chapter = chapter;
        this.scene = scene;
    }
    async execNext() {
        if (this.timelineIndex >= this.timeline.length)
            return {
                index: this.timelineIndex,
                event: null,
                continueTimeline: false,
            };
        const event = this.timeline[this.timelineIndex];
        let continueTimeline;
        try {
            continueTimeline = await event.exec();
        }
        catch (e) {
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
    changeBackground(background) {
        this.addAction({
            type: EventType.ChangeBackground,
            data: {
                background,
            },
            exec: async () => {
                await Pamyu.assetManager.setBackground(background, 500);
                return true;
            },
        });
        return this;
    }
    choice(character, message, choices, expression) {
        this.addAction({
            type: EventType.Choice,
            data: {
                message,
                choices,
            },
            exec: async () => {
                this.setExpression(character, expression);
                console.error("Choice not implemented");
                return true;
            },
        });
        return this;
    }
    goto(scene) {
        this.addAction({
            type: EventType.Goto,
            data: {
                scene,
            },
            exec: async () => {
                console.error("Goto not implemented");
                return true;
            },
        });
        return this;
    }
    join(character, position, expression) {
        this.addAction({
            type: EventType.Join,
            data: {
                character,
                position,
            },
            exec: async () => {
                this.setExpression(character, expression);
                Pamyu.characterManager.join(character, position);
                character.setVisible(true);
                return true;
            },
        });
        return this;
    }
    leave(character) {
        this.addAction({
            type: EventType.Leave,
            data: {
                character,
            },
            exec: async () => {
                character.setVisible(false);
                console.warn("Leave not completely implemented");
                return true;
            },
        });
        return this;
    }
    msg(character, message, thinking, expression) {
        this.addAction({
            type: EventType.Msg,
            data: {
                character,
                message,
            },
            exec: async () => {
                this.setExpression(character, expression);
                await Pamyu.messageManager.showMessage(character, `ch${this.chapter}.sc${this.scene}.${message}`, thinking);
                return false;
            },
        });
        return this;
    }
    think(character, message, expression) {
        this.msg(character, message, true, expression);
        return this;
    }
    talk(character, message, expression) {
        this.msg(character, message, false, expression);
        return this;
    }
    save() {
        this.addAction({
            type: EventType.Save,
            data: {
                scene: this.name,
            },
            exec: async () => {
                await Pamyu.saveManager.save({
                    version: "0.0.2",
                    value: 5,
                });
                return true;
            },
        });
        return this;
    }
    setAchievement(achievement) {
        this.addAction({
            type: EventType.SetAchievement,
            data: {
                achievement,
            },
            exec: async () => {
                console.error("Set achievement not implemented");
                return true;
            },
        });
        return this;
    }
    variable(action, name, value) {
        this.addAction({
            type: EventType.Save,
            data: {
                action,
                name,
                value,
            },
            exec: async () => {
                console.error("Variable not implemented");
                return true;
            },
        });
        return this;
    }
    setExpression(character, expression) {
        if (expression !== undefined)
            character.setSprite(expression);
        return this;
    }
    addAction(event) {
        this.timeline.push(event);
        return this;
    }
}
//# sourceMappingURL=Scene.js.map