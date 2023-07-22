export class Config {
    constructor(config) {
        this.transitionSpeed = 0;
        this.messageSpeed = 0;
        this.translation = "";
        this.getTransitionSpeed = () => this.transitionSpeed;
        this.getMessageSpeed = () => this.messageSpeed;
        Object.assign(this, config);
    }
}
//# sourceMappingURL=Config.js.map