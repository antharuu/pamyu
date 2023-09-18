import {createApp} from "vue";
import "./styles.css";
import App from "./App.vue";
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes/main";

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes
} as any)

const app = createApp(App);

app.use(router)
app.mount("#app");
