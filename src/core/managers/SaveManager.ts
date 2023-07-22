import ISaveManager from "../interfaces/managers/ISaveManager";

export default class SaveManager implements ISaveManager {
  public saveVersion: string;

  public constructor(saveVersion: string) {
    this.saveVersion = saveVersion;
  }

  public async load(): Promise<ISaveManager> {
    // Here you can write logic to load data.
    return this;
  }

  public async save(data: SaveFormat): Promise<ISaveManager> {
    const res = false; // TODO: Add save later

    if (!res) {
      console.warn(data);
      throw new Error("Save failed");
    }

    return this;
  }
}
