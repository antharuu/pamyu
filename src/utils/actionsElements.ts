import {useI18n} from 'vue-i18n';

import {ActionElement} from '../types/scene.ts';

const actionsElements: Omit<ActionElement, 'label'>[] = [
    {name: 'message', icon: 'message'},
    {name: 'jump', icon: 'keyboard_double_arrow_right'},
    {name: 'raw', icon: 'code'},
];

export function getActionsElements(): ActionElement[] {
    return actionsElements?.map((action: Omit<ActionElement, 'label'>) => ({
        ...action,
        label: useI18n().t(`scenes.actions.${action.name}.title`),
    }));
}