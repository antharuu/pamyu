import {createPinia} from 'pinia';
import {createApp, VNode, VNodeChild, watch} from 'vue';
import {createRouter, createWebHistory, RouterOptions} from 'vue-router';

import {useProjectStore} from './stores/useProjectStore.ts';

import {loadData, saveData} from './utils/data';
import i18n from './utils/i18n';
import {getAllProjectRenpyFiles} from './utils/import.ts';
import {PathManager} from './utils/path.ts';
import {updateCharacters} from './utils/rpy.ts';
import {capitalize, deepAssign} from './utils/tools.ts';

import {routes, routesFallback} from './routes/main';

import {version} from '../package.json';

import App from './App.vue';
import defaultStores from './default-stores.json';

import './styles.css';

console.clear();
console.log(`👁️ Pamyu ~ ${version}`);

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: !PathManager.isEmpty ? routes : routesFallback
} as RouterOptions);

export const path = PathManager.last?.path ?? '';

const pinia = createPinia();

const baseData = await loadData();
if (baseData) {
    if (typeof baseData === 'object') {
        pinia.state.value = deepAssign(defaultStores, baseData);

        void saveData(pinia.state.value);
    }
}

watch(pinia.state, (state) => saveData(state), {deep: true});

const app = createApp(App);

function isVNodeWithEl(child: VNodeChild): child is VNode & {
    el: HTMLElement
} {
    return !!child && (child as VNode).el !== undefined && (child as VNode).el !== null;
}

app.directive('capitalize', {
    updated(_el, _binding, vnode: VNode) {
        if (Array.isArray(vnode.children)) {
            const input = (vnode.children as VNodeChild[]).find(child => {
                return isVNodeWithEl(child) && child.el.tagName === 'INPUT';
            });

            if (input && isVNodeWithEl(input)) {
                input.el.value = capitalize(input.el.value);
            } else {
                throw new Error('No input found in capitalize directive');
            }
        } else {
            throw new Error('Children are not an array in capitalize directive');
        }
    }
});

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');

updateCharacters();

useProjectStore().init().then(() => getAllProjectRenpyFiles());