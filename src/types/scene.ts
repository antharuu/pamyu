import {Character} from './character';

export type BaseElement = {
    _id: string;
    _order: number;
}

export type Variable = BaseElement & {
    name: string;
    value: string;
    type: 'string' | 'number' | 'boolean';
}

export type Label = {
    _id: string;
    name: string;
    actions: Action['_id'][];
}

export type WithTransition = {
    transition: string;
    duration: number;
};

export type AtPosition = {
    position: 'left' | 'center' | 'right';
};

export type OnLayer = {
    onLayer: 'background' | 'foreground';
}

export type ImageOrCharacter = {
    image: string;
} | {
    character: Character['_id'];
    expression?: string | Variable['_id'];
};

export type Action = BaseElement & (
    BackgroundAction |
    PlayAction |
    StopAction |
    MessageAction |
    ConditionAction |
    MenuAction |
    ShowAction |
    HideAction |
    JumpAction | // OK
    RawAction | // OK
    ReturnAction
    );

export type BackgroundAction = {
    type: 'background';
    background: string;
} & WithTransition & AtPosition;

export type PlayAction = {
    type: 'play'
    playType: 'music' | 'sound' | 'movie';
    file: string;
    repeat?: boolean;
    channel?: string;
} & WithTransition;

export type StopAction = {
    type: 'stop'
    playType: 'music' | 'sound' | 'movie';
} & WithTransition;

export type MessageAction = {
    type: 'message';
    message: string;
    character: Character['_id'] | null;
};

export type ConditionAction = {
    type: 'condition';
    conditions: string[];
    actions: Action['_id'][]
};

export type MenuOption = BaseElement & {
    label: string;
    actions: Action['_id'][];
}

export type MenuAction = {
    type: 'menu';
    question: MessageAction;
    options: MenuOption[];
};

export type ShowAction = {
    type: 'show';
} & ImageOrCharacter & WithTransition & AtPosition & OnLayer;

export type HideAction = {
    type: 'hide';
} & ImageOrCharacter & WithTransition & OnLayer;


export type JumpAction = {
    type: 'jump';
    sceneId: Label['_id'] | null;
};

export type RawAction = {
    type: 'raw';
    code: string;
};

export type ReturnAction = {
    type: 'return';
};

export type ActionElement = {
    name: Action['type'];
    icon: string;
    label: string;
}

export type ActionElementObject = {
    [K in Action['type']]?: {
        icon: string
        label: string
    }
}