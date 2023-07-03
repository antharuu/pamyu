import { invoke } from "@tauri-apps/api/tauri";

import ISaveManager from "../interfaces/managers/ISaveManager";

export default class SaveManager implements ISaveManager {
  public saveVersion: string;

  public constructor(saveVersion: string) {
    console.log(`Current save version: ${saveVersion}`);
    this.saveVersion = saveVersion;
  }

  public async load(): Promise<ISaveManager> {
    // Here you can write logic to load data.
    return this;
  }

  public async save(data: SaveFormat): Promise<ISaveManager> {
    const res = await invoke("save", data);

    if (res !== true) {
      throw new Error("Save failed");
    }

    return this;
  }
}
