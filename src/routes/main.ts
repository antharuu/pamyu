import CharacterCreate from '../pages/character/create.vue';
import CharacterDelete from '../pages/character/delete.vue';
import CharacterEdit from '../pages/character/edit.vue';
import CharacterCreateFolder from '../pages/character/folder/create.vue';
import Characters from '../pages/characters.vue';
import Game from '../pages/game.vue';
import NotFound from '../pages/not-found.vue';
import Projects from '../pages/projects.vue';
import SceneCreate from '../pages/scene/create.vue';
import SceneEdit from '../pages/scene/edit.vue';
import Scenes from '../pages/scenes.vue';
import Settings from '../pages/settings.vue';

export const routes = [
    {
        path: '/',
        redirect: 'game'
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects
    },
    {
        path: '/game',
        name: 'game',
        component: Game
    },
    {
        path: '/characters',
        name: 'characters',
        component: Characters,
        children: [
            {
                path: '',
                name: 'character.index',
                redirect: {name: 'character.create'},
            },
            {
                path: 'create',
                name: 'character.create',
                component: CharacterCreate
            },
            {
                path: 'edit/:id',
                name: 'character.edit',
                component: CharacterEdit
            },
            {
                path: 'delete/:id',
                name: 'character.delete',
                component: CharacterDelete
            },
            {
                path: 'character.create-folder',
                name: 'character.create-folder',
                component: CharacterCreateFolder
            }
        ]
    },
    {
        path: '/scenes',
        name: 'scenes',
        component: Scenes,
        children: [
            {
                path: '',
                name: 'scene.index',
                redirect: {name: 'scene.create'},
            },
            {
                path: 'create',
                name: 'scene.create',
                component: SceneCreate
            },
            {
                path: 'scene/:id',
                name: 'scene.edit',
                component: SceneEdit
            }
        ]
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }
];

export const routesFallback = [
    {
        path: '/',
        redirect: 'projects'
    },
    {
        path: '/',
        name: 'projects',
        component: Projects
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    },
    {
        path: '/:pathMatch(.*)*',
        component: Projects
    }
];