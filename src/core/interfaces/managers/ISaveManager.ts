export default interface ISaveManager {
  saveVersion: string;

  load(): Promise<ISaveManager>;

  save(data: object): Promise<ISaveManager>;
}
