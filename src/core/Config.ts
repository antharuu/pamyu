import { IConfig } from "./interfaces/IConfig";

export class Config implements IConfig {
  public transitionSpeed = 0;

  public messageSpeed = 0;

  public constructor(config: Partial<IConfig>) {
    Object.assign(this, config);
  }

  public getTransitionSpeed = (): number => this.transitionSpeed;

  public getMessageSpeed = (): number => this.messageSpeed;
}
