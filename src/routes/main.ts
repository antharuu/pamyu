import NotFound from "../pages/not-found.vue";
import Settings from "../pages/settings.vue";

export const routes = [
    {
        path: "/",
        name: "settings",
        redirect: "/characters"
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