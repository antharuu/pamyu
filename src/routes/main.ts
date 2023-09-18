import {RouteRecord} from "vue-router";

export const routes: RouteRecord[] = [
    {
        path: "/",
        name: "project",
        component: () => import("../pages/project.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("../pages/not-found.vue")
    }
];