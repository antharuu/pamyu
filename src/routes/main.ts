import Project from "../pages/project.vue";
import NotFound from "../pages/not-found.vue";

export const routes = [
    {
        path: "/",
        name: "project",
        component: Project
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound
    }
];