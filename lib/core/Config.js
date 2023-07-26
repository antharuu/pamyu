// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { version } from "../../package.json";
export class Config {
    constructor(config) {
        this.pamyuVersion = "0.0.0";
        this.pamyuDevEnv = false;
        this.transitionSpeed = 0;
        this.messageSpeed = 0;
        this.translation = null;
        this.defaultLanguage = "en";
        this.sides = ["left", "right"];
        this.positions = {
            left: 1,
            right: 1,
        };
        this.importBaseStyles = true;
        this.thinkCharacters = ["( ", " )"];
        this.getTransitionSpeed = () => this.transitionSpeed;
        this.getMessageSpeed = () => this.messageSpeed;
        Object.assign(this, config);
        this.pamyuVersion = version;
    }
}
//# sourceMappingURL=Config.js.map