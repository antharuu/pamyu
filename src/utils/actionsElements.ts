import {useI18n} from 'vue-i18n';

import {ActionElement} from '../types/scene.ts';

const actionsElements: Omit<ActionElement, 'label'>[] = [
    {name: 'raw', icon: 'code'},
    {name: 'jump', icon: 'keyboard_double_arrow_right'},
];

export function getActionsElements(): ActionElement[] {
    return actionsElements?.map((action: Omit<ActionElement, 'label'>) => ({
        ...action,
        label: useI18n().t(`scenes.actions.${action.name}.title`),
    }));
}