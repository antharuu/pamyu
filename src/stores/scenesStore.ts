import {defineStore} from 'pinia';
import {StrictOmit} from 'ts-essentials';

import {getCleanNameWithDashes, getRandomToken} from '../utils/tools.ts';

import {Action, Label} from '../types/scene.ts';
import {ScenesState} from '../types/state.ts';

export const useScenesStore = defineStore({
    id: 'ScenesData',
    state: (): ScenesState => ({
        scenes: [],
        actions: []
    }),
    getters: {
        getScenes(): Label[] {
            return this.scenes || [];
        },
        getSceneById(): (id: Label['_id']) => Label | undefined {
            return (id: string) => this.scenes.find((scene: Label) => scene._id === id);
        },
        getActionById(): (id: Action['_id']) => Action | undefined {
            return (id: string) => this.actions.find((action: Action) => action._id === id);
        },
        getSceneByActionId(): (actionId: Action['_id']) => Label | undefined {
            return (actionId: string) => this.scenes.find((scene: Label) => scene.actions.includes(actionId));
        },
        getAllActionsOfScene(): (sceneId: Label['_id']) => Action[] {
            return (sceneId: Label['_id']) => {
                const scene = this.getSceneById(sceneId);

                if (!scene) {
                    return [];
                }

                return scene.actions.map((actionId) => this.getActionById(actionId))
                    .filter((action) => action !== undefined)
                    .sort((action1, action2) =>
                        action1!._order - action2!._order) as Action[];
            };
        },
        getNextActionOrder(): (sceneId: Label['_id']) => number {
            return (sceneId: Label['_id']) => {
                const scene = this.getSceneById(sceneId);
                return scene ? scene.actions.length : 0;
            };
        }
    },
    actions: {
        createScene(sceneName: Label['name']): string {
            const id = getRandomToken();
            const cleanSceneName = getCleanNameWithDashes(sceneName);

            const sceneId = `sc_${cleanSceneName}_${id}`;

            this.scenes.push({
                _id: sceneId,
                name: sceneName,
                actions: []
            });

            return sceneId;
        },
        createAction(
            type: Action['type'],
            action: StrictOmit<Action, '_id' | '_order' | 'type'>,
            sceneId: string,
            order: number
        ): string {
            const id = getRandomToken();
            const actionId = `ac_${type}_${id}`;

            this.actions.push({
                _id: actionId,
                _order: order,
                type,
                ...action
            } as Action);

            this.addActionToScene(actionId, sceneId);
            this.fixActionsOrder(this.getSceneById(sceneId));

            return actionId;
        },
        updateAction(action: Action): void {
            const actionIndex = this.actions.findIndex((a) => a._id === action._id);
            if (actionIndex === -1) return;

            this.actions[actionIndex] = action;
        },
        deleteAction(actionId: Action['_id']): boolean {
            const scene = this.getSceneByActionId(actionId);

            const actionIndex = this.actions.findIndex((a) => a._id === actionId);
            if (actionIndex === -1) return false;

            this.actions.splice(actionIndex, 1);
            this.removeActionFromScenes(actionId);

            setTimeout(() => {
                this.fixActionsOrder(scene);
            }, 100);

            return true;
        },
        addActionToScene(actionId: Action['_id'], sceneId: Label['_id']): void {
            const scene = this.getSceneById(sceneId);
            if (!scene) return;

            scene.actions.push(actionId);
        },
        removeActionFromScenes(actionId: Action['_id']): void {
            this.scenes.forEach((scene) => {
                const actionIndex = scene.actions.findIndex((a) => a === actionId);
                if (actionIndex === -1) return;

                scene.actions.splice(actionIndex, 1);
            });
        },
        invertActionsOrder(actionId1: Action['_id'], actionId2: Action['_id']): void {
            const action1 = this.getActionById(actionId1);
            const action2 = this.getActionById(actionId2);
            if (!action1 || !action2) return;

            const tmpOrder = action1._order;
            action1._order = action2._order;
            action2._order = tmpOrder;
        },
        getActionByOrder(sceneId: Label['_id'], order: number): Action | undefined {
            const scene = this.getSceneById(sceneId);
            if (!scene) return;

            return this.actions.find((action) =>
                action._order === order && scene.actions.includes(action._id));
        },

        updateActionOrder(actionId: Action['_id'], delta: -1 | 1): void {
            const action = this.getActionById(actionId);
            if (!action) return;

            const scene = this.getSceneByActionId(actionId);
            if (!scene) return;

            const action2 = this.getActionByOrder(scene._id, action._order + delta);
            if (!action2) return;

            this.invertActionsOrder(action._id, action2._id);
        },
        fixActionsOrder(scene: Label | undefined): void {
            if (!scene) return;

            const actions = this.getAllActionsOfScene(scene._id);

            actions.forEach((action, index) => {
                action._order = index;
            });
        }
    }
});