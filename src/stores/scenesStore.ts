import {defineStore} from 'pinia';

import {getCleanNameWithDashes, getRandomToken} from '../utils/tools.ts';

import {Label} from '../types/scene.ts';

export const useScenesStore = defineStore({
    id: 'ScenesData',
    state: (): {
        scenes: Label[]
    } => ({
        scenes: []
    }),
    getters: {
        getScenes(): Label[] {
            return this.scenes || [];
        },
        getSceneById(): (id: Label['_id']) => Label | undefined {
            return (id: string) => this.scenes.find((scene: Label) => scene._id === id);
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
        }
    }
});