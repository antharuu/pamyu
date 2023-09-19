import {createApp, watch} from "vue";
import "./styles.css";
import App from "./App.vue";
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes/main";
import {createPinia} from "pinia";
import {invoke} from "@tauri-apps/api/tauri";
import i18n from "./utils/i18n";

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes
} as any)

const path = "D:/Maana/RenpyUiTestProject"

const pinia = createPinia()

const baseData = await invoke("load_data", {path})
if(baseData) {
    if (typeof baseData === "string") {
        pinia.state.value = JSON.parse(baseData)
    }
}

watch(pinia.state, (state) => {
    invoke("save_data", {path, data: JSON.stringify(state)}).then(r => console.log(r))
}, {deep: true})

const app = createApp(App);
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount("#app");
