export interface IMessageManager {
    hasBoxVisible: boolean;

    showBox(): Promise<void>;

    hideBox(): Promise<void>;

    showMessage(character: string, message: string): Promise<void>;
}