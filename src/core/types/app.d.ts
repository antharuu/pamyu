import { IEvent } from "../interfaces/IEvent";

type AppOptions = Partial<{
  background: string;
}>;

type EventExecReturn = {
  index: number;
  event: IEvent | null;
  continueTimeline: boolean;
};

type CharacterOptions = Partial<{
  color: string;
  isDemon: boolean;
  expressions: string[] | "*";
}>;

type Asset = string;

type AssetList = { [name: string]: Asset };

type Assets = {
  [type: string]: AssetList;
};
