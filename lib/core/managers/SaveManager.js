export default class SaveManager {
    constructor(saveVersion) {
        this.saveVersion = saveVersion;
    }
    async load() {
        // Here you can write logic to load data.
        return this;
    }
    async save(data) {
        const res = false; // TODO: Add save later
        if (!res) {
            console.warn(data);
            throw new Error("Save failed");
        }
        return this;
    }
}
//# sourceMappingURL=SaveManager.js.map