import NotFound from "../pages/not-found.vue";
import Settings from "../pages/settings.vue";
import Characters from "../pages/characters.vue";
import CharacterCreate from "../pages/character/create.vue";
import CharacterEdit from "../pages/character/edit.vue";
import CharacterDelete from "../pages/character/delete.vue";

export const routes = [
    {
        path: "/",
        redirect: "characters"
    },
    {
        path: "/characters",
        name: "characters",
        component: Characters,
        children: [
            {
                path: "",
                redirect: {name: "character.create"}
            },
            {
                path: "create",
                name: "character.create",
                component: CharacterCreate
            },
            {
                path: "edit/:id",
                name: "character.edit",
                component: CharacterEdit
            },
            {
                path: "delete/:id",
                name: "character.delete",
                component: CharacterDelete
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