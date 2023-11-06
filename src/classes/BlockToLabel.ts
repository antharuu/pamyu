import {Action, JumpAction, Label, MessageAction, ReturnAction, ShowAction} from '../types/scene.ts';
import {Block} from '../types/script.ts';

export class BlockToLabel {
    public block: Block;
    public label: Label = {};

    private LABEL_REGEX = /^label (?<name>.*):$/;
    private RETURN_REGEX = /^return$/;
    private MESSAGE_REGEX = /^((?<character>\w+) )?"(?<messsage>.*)"$/;
    private SHOW_REGEX = /^show\s(?<image_name>[\w_]+(?:\s[\w_]+)?)(?:\sat\s(?<position>left|center|right))?(?:\swith\s(?<animation>[\w_]+))?/;
    private JUMP_REGEX = /^jump (?<sceneId>.*)$/;

    constructor(labelLine: string, block: Block) {
        console.log('⭐ Starting to scan label: \n' + labelLine);
        console.log(block);
        this.block = block;

        this.scanLabel(labelLine);
        this.label.actions = this.scanActions(this.block);
    }

    public getLabel(): Label {
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

            if (typeof block === 'string') {
                if (block.match(this.RETURN_REGEX)) {
                    actions.push(this.getReturnAction());
                } else if (block.match(this.MESSAGE_REGEX)) {
                    actions.push(this.getMessageAction(block));
                } else if (block.match(this.SHOW_REGEX)) {
                    actions.push(this.getShowAction(block));
                } else if (block.match(this.JUMP_REGEX)) {
                    actions.push(this.getJumpAction(block));
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

    private getMessageAction(block: string): MessageAction {
        const message = block.match(this.MESSAGE_REGEX);

        if (message) {
            return {
                type: 'message',
                message: message.groups.messsage,
                character: message.groups.character
            };
        }
    }

    private getShowAction(block: string): ShowAction {
        const show = block.match(this.SHOW_REGEX);

        if (show && show.groups) {
            const showAction = {
                type: 'show',
                image: show.groups.image_name
            } as ShowAction;

            if (show.groups.position) {
                showAction.position = show.groups.position;
            }

            if (show.groups.animation) {
                showAction.animation = show.groups.animation;
            }

            return showAction;
        }
    }

    private getJumpAction(block: string): JumpAction {
        const jump = block.match(this.JUMP_REGEX);

        if (jump) {
            return {
                type: 'jump',
                sceneId: jump.groups.sceneId
            };
        }
    }
}