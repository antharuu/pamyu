import {
    Action,
    FlatLabel,
    JumpAction,
    MenuAction,
    MenuOption,
    MessageAction,
    ReturnAction,
    ShowAction
} from '../types/scene.ts';
import {Block} from '../types/script.ts';

export class BlockToLabel {
    public block: Block;
    public label: FlatLabel = {
        name: '',
        actions: []
    };

    private LABEL_REGEX = /^label (?<name>.*):$/;
    private RETURN_REGEX = /^return$/;
    private MESSAGE_REGEX = /^((?<character>\w+) )?"(?<messsage>.*)"$/;
    private SHOW_REGEX = /^show\s(?<image_name>[\w_]+(?:\s[\w_]+)?)(?:\sat\s(?<position>left|center|right))?/;
    private JUMP_REGEX = /^jump (?<sceneId>.*)$/;
    private MENU_REGEX = /^menu\s*:$/;

    constructor(labelLine: string, block: Block) {
        console.log('⭐ Starting to scan label: \n' + labelLine);
        console.log(block);
        this.block = block;

        this.scanLabel(labelLine);
        this.label.actions = this.scanActions(this.block);
    }

    public getLabel(): FlatLabel {
        return this.label;
    }

    private scanLabel(labelLine: string): void {
        const label = labelLine.match(this.LABEL_REGEX);

        if (label) {
            this.label.name = label[1];
        }
    }

    private scanActions(blocks: Block): Action[] {
        const actions: Action[] = [];
        let nextMenu = false;

        // eslint-disable-next-line complexity
        blocks.forEach(block => {
            let newAction: unknown = null;

            if (typeof block === 'string') {
                if (block.match(this.RETURN_REGEX)) {
                    newAction = this.getReturnAction();
                } else if (block.match(this.MESSAGE_REGEX)) {
                    newAction = this.getMessageAction(block);
                } else if (block.match(this.SHOW_REGEX)) {
                    newAction = this.getShowAction(block);
                } else if (block.match(this.JUMP_REGEX)) {
                    newAction = this.getJumpAction(block);
                } else if (block.match(this.MENU_REGEX)) {
                    nextMenu = true;
                }

                if (newAction) {
                    actions.push(newAction as Action);
                }
            } else if (Array.isArray(block)) {
                if (nextMenu) {
                    nextMenu = false;
                    actions.push(...this.scanMenu(block));
                } else {
                    actions.push(...this.scanActions(block));
                }
            }
        });

        return actions;
    }

    private getReturnAction(): ReturnAction {
        return {
            type: 'return'
        };
    }

    private getMessageAction(block: string): MessageAction | null {
        const message = block.match(this.MESSAGE_REGEX);

        if (message && message.groups) {
            return {
                type: 'message',
                message: message.groups.messsage,
                character: message.groups.character || null
            };
        }

        return null;
    }

    private getShowAction(block: string): ShowAction | null {
        const show = block.match(this.SHOW_REGEX);

        if (show && show.groups) {
            const showAction = {
                type: 'show',
                image: show.groups.image_name
            } as ShowAction;

            if (show.groups.position) {
                showAction.position = show.groups.position as 'left' | 'center' | 'right';
            }

            // TODO: transition & duration

            return showAction;
        }

        return null;
    }

    private getJumpAction(block: string): JumpAction | null {
        const jump = block.match(this.JUMP_REGEX);

        if (jump && jump.groups) {
            return {
                type: 'jump',
                sceneId: jump.groups.sceneId
            };
        }

        return null;
    }

    private scanMenu(blocks: Block): Action[] {
        const actions: Action[] = [];
        const menuAction: MenuAction = {
            type: 'menu',
            question: {
                type: 'message',
                message: '',
                character: null
            } as MessageAction,
            options: []
        };
        let currentOption: { label: string; actions: Action[] } | null = null;

        // eslint-disable-next-line complexity
        blocks.forEach((block, index) => {
            if (typeof block === 'string') {
                if (index === 0) {
                    const messageAction = this.getMessageAction(block);
                    if (messageAction) {
                        menuAction.question = messageAction;
                    }
                } else {
                    const optionMatch = block.match(/^"(.*)":$/);
                    if (optionMatch) {
                        // If currentOption is already set, push it to the menu options and start a new one.
                        if (currentOption) {
                            menuAction.options.push(currentOption as MenuOption);
                        }
                        // Initialize a new current option
                        currentOption = {label: optionMatch[1], actions: []};
                    }
                }
            } else if (Array.isArray(block) && currentOption) {
                // If it's an array, and we have an option ongoing, process the actions in the block.
                currentOption.actions = this.scanActions(block);
            }
        });

        // After the loop, check if there's a last option that needs to be added.
        if (currentOption) {
            menuAction.options.push(currentOption);
        }

        // If we found at least one option, push the menuAction to the actions array.
        if (menuAction.options.length > 0) {
            actions.push(menuAction as Action);
        }

        return actions;
    }
}