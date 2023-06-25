import {IDialogManager} from "../interfaces/IDialogManager";
import {IDialog} from "../interfaces/IDialog";

export class DialogManager implements IDialogManager {
    dialogs: Map<string, IDialog> = new Map<string, IDialog>();

    getDialog(name: string): IDialog {
        return this.dialogs.get(name) as IDialog;
    }
}