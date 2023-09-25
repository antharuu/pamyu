import CharacterCreate from '../pages/character/create.vue';
import CharacterDelete from '../pages/character/delete.vue';
import CharacterEdit from '../pages/character/edit.vue';
import Characters from '../pages/characters.vue';
import NotFound from '../pages/not-found.vue';
import Projects from '../pages/projects.vue';
import Settings from '../pages/settings.vue';

export const routes = [
    {
        path: '/',
        redirect: 'characters'
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects
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