import NotFound from "../pages/not-found.vue";

export const routes = [
    {
        path: "/",
        name: "settings",
        redirect: "/characters"
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound
    }
];