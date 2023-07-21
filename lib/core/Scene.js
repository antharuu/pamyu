var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Pamyu from "./Pamyu";
import { EventType } from "./interfaces/IEvent";
export class Scene {
    constructor(name, chapter, scene) {
        this.timelineIndex = 0;
        this.name = name;
        this.timeline = [];
        this.chapter = chapter;
        this.scene = scene;
    }
    execNext() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.timelineIndex >= this.timeline.length)
                return {
                    index: this.timelineIndex,
                    event: null,
                    continueTimeline: false,
                };
            const event = this.timeline[this.timelineIndex];
            let continueTimeline;
            try {
                continueTimeline = yield event.exec();
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
        });
    }
    changeBackground(background) {
        this.addAction({
            type: EventType.ChangeBackground,
            data: {
                background,
            },
            exec: () => __awaiter(this, void 0, void 0, function* () {
                yield Pamyu.assetManager.setBackground(background, 500);
                return true;
            }),
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
            exec: () => __awaiter(this, void 0, void 0, function* () {
                this.setExpression(character, expression);
                console.error("Choice not implemented");
                return true;
            }),
        });
        return this;
    }
    goto(scene) {
        this.addAction({
            type: EventType.Goto,
            data: {
                scene,
            },
            exec: () => __awaiter(this, void 0, void 0, function* () {
                console.error("Goto not implemented");
                return true;
            }),
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
            exec: () => __awaiter(this, void 0, void 0, function* () {
                this.setExpression(character, expression);
                character.setVisible(true);
                console.warn("Join not completly implemented");
                return true;
            }),
        });
        return this;
    }
    leave(character) {
        this.addAction({
            type: EventType.Leave,
            data: {
                character,
            },
            exec: () => __awaiter(this, void 0, void 0, function* () {
                character.setVisible(false);
                console.warn("Leave not completly implemented");
                return true;
            }),
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
            exec: () => __awaiter(this, void 0, void 0, function* () {
                this.setExpression(character, expression);
                yield Pamyu.messageManager.showMessage(character, `ch${this.chapter}.sc${this.scene}.${message}`, thinking);
                return false;
            }),
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
            exec: () => __awaiter(this, void 0, void 0, function* () {
                yield Pamyu.saveManager.save({
                    version: "0.0.2",
                    value: 5,
                });
                console.log("Save completed successfully.");
                return true;
            }),
        });
        return this;
    }
    setAchievement(achievement) {
        this.addAction({
            type: EventType.SetAchievement,
            data: {
                achievement,
            },
            exec: () => __awaiter(this, void 0, void 0, function* () {
                console.error("Set achievement not implemented");
                return true;
            }),
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
            exec: () => __awaiter(this, void 0, void 0, function* () {
                console.error("Variable not implemented");
                return true;
            }),
        });
        return this;
    }
    setExpression(character, expression) {
        if (!Boolean(expression))
            return this;
        if (typeof expression === "string")
            character.setExpression(expression);
        return this;
    }
    addAction(event) {
        this.timeline.push(event);
        return this;
    }
}
