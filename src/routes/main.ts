import NotFound from "../pages/not-found.vue";
import Settings from "../pages/settings.vue";
import Characters from "../pages/characters.vue";
import CharacterCreate from "../pages/character/create.vue";

export const routes = [
    {
        path: "/",
        name: "settings",
        redirect: "/characters"
    },
    {
        path: "/characters",
        name: "characters",
        component: Characters,
        children: [
            {
                path: "create",
                name: "character.create",
                component: CharacterCreate
            }
        ]
    },
    {
        path: "/settings",
        name: "settings",
        component: Settings
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound
    }
];