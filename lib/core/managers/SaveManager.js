var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class SaveManager {
    constructor(saveVersion) {
        console.info(`Current save version: ${saveVersion}`);
        this.saveVersion = saveVersion;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            // Here you can write logic to load data.
            return this;
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = false; // TODO: Add save later
            if (!res) {
                console.warn(data);
                throw new Error("Save failed");
            }
            return this;
        });
    }
}
//# sourceMappingURL=SaveManager.js.map