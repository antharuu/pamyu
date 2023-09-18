import {createApp} from "vue";
import "./styles.css";
import App from "./App.vue";
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes/main";
import {createPinia} from "pinia";

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes
} as any)

const pinia = createPinia()

const app = createApp(App);

app.use(pinia)
app.use(router)
app.mount("#app");
