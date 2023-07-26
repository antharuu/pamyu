// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { version } from "../../package.json";
import { IConfig } from "./interfaces/IConfig";

export class Config implements IConfig {
  public pamyuVersion = "0.0.0";

  public pamyuDevEnv = false;

  public transitionSpeed = 0;

  public messageSpeed = 0;

  public translation = null;

  public defaultLanguage = "en";

  public sides = ["left", "right"];

  public positions = 2;

  public importBaseStyles = true;

  public thinkCharacters:
    | [string, string]
    | {
        prefix?: string;
        suffix?: string;
      } = ["( ", " )"];

  public constructor(config: Partial<IConfig>) {
    Object.assign(this, config);

    this.pamyuVersion = version;
  }

  public getTransitionSpeed = (): number => this.transitionSpeed;

  public getMessageSpeed = (): number => this.messageSpeed;
}
