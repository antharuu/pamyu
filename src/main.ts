import {version} from "../package.json";
import {createApp, watch} from "vue";
import "./styles.css";
import App from "./App.vue";
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes/main";
import {createPinia} from "pinia";
import defaultStores from "./default-stores.json";
import i18n from "./utils/i18n";
import {load_data, save_data} from "./utils/data";
import {deepAssign} from "./utils/tools.ts";

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes
} as any)

export const path = "D:/Maana/RenpyUiTestProject"

const pinia = createPinia()

console.clear()
console.log(`👁️ Pamyu ~ ${version}`)

const baseData = await load_data()
if (baseData) {
    if (typeof baseData === "object") {
        const completeData = deepAssign(defaultStores, baseData)
        pinia.state.value = completeData

        save_data(completeData)
    }
}

watch(pinia.state, (state) => save_data(state), {deep: true})

const app = createApp(App);
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount("#app");