import {Action, FlatLabel, JumpAction, MessageAction, ReturnAction, ShowAction} from '../types/scene.ts';
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
                }

                if (newAction) {
                    actions.push(newAction as Action);
                }
            } else if (Array.isArray(block)) {
                actions.push(...this.scanActions(block));
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
                character: message.groups.character
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
}