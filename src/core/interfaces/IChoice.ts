import { IScene } from "./IScene";

export interface IChoice {
  message: string;
  exec: () => Promise<IScene>;
}
