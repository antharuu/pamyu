import {IDialog} from "./IDialog";

export interface IDialogManager {
    dialogs: Map<string, IDialog>;

    getDialog(name: string): IDialog;
}