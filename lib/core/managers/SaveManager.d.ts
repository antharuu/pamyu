import ISaveManager from "../interfaces/managers/ISaveManager";
export default class SaveManager implements ISaveManager {
    saveVersion: string;
    constructor(saveVersion: string);
    load(): Promise<ISaveManager>;
    save(data: SaveFormat): Promise<ISaveManager>;
}
