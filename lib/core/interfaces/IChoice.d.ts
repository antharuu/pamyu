import { IScene } from "./IScene";
export default interface IChoice {
    message: string;
    exec: () => Promise<IScene>;
}
