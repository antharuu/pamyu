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
        getAllActionsOfScene(): (sceneId: Label['_id']) => Action[] {
            return (sceneId: Label['_id']) => {
                const scene = this.getSceneById(sceneId);

                if (!scene) {
                    return [];
                }

                return scene.actions.map((actionId) => this.getActionById(actionId))
                    .filter((action) => action !== undefined) as Action[];
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
        createAction(type: Action['type'], action: StrictOmit<Action, '_id' | 'type'>, sceneId: string): string {
            const id = getRandomToken();
            const actionId = `ac_${type}_${id}`;

            console.log({
                _id: actionId,
                type,
                ...action
            }, this.actions);

            this.actions.push({
                _id: actionId,
                type,
                ...action
            } as Action);

            this.addActionToScene(actionId, sceneId);

            return actionId;
        },
        updateAction(action: Action): void {
            const actionIndex = this.actions.findIndex((a) => a._id === action._id);

            if (actionIndex === -1) {
                return;
            }

            this.actions[actionIndex] = action;
        },
        deleteAction(actionId: Action['_id']): boolean {
            const actionIndex = this.actions.findIndex((a) => a._id === actionId);

            if (actionIndex === -1) {
                return false;
            }

            this.actions.splice(actionIndex, 1);
            this.removeActionFromScenes(actionId);

            return true;
        },
        addActionToScene(actionId: Action['_id'], sceneId: Label['_id']): void {
            const scene = this.getSceneById(sceneId);

            if (!scene) {
                return;
            }

            scene.actions.push(actionId);
        },
        removeActionFromScenes(actionId: Action['_id']): void {
            this.scenes.forEach((scene) => {
                const actionIndex = scene.actions.findIndex((a) => a === actionId);

                if (actionIndex === -1) {
                    return;
                }

                scene.actions.splice(actionIndex, 1);
            });
        },
    }
});