import {version} from "../package.json";
import {createApp, VNode, VNodeChild, watch} from "vue";
import "./styles.css";
import App from "./App.vue";
import {createRouter, createWebHistory, RouterOptions} from "vue-router";
import {routes} from "./routes/main";
import {createPinia} from "pinia";
import defaultStores from "./default-stores.json";
import i18n from "./utils/i18n";
import {load_data, save_data} from "./utils/data";
import {capitalize, deepAssign} from "./utils/tools.ts";
import {update_characters} from "./utils/rpy.ts";

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes
} as RouterOptions)

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

function isVNodeWithEl(child: VNodeChild): child is VNode & { el: HTMLElement } {
    return !!child && (child as VNode).el !== undefined && (child as VNode).el !== null;
}

app.directive("capitalize", {
    updated(_el, _binding, vnode: VNode) {
        if (Array.isArray(vnode.children)) {
            const input = (vnode.children as VNodeChild[]).find(child => {
                return isVNodeWithEl(child) && child.el.tagName === "INPUT";
            });

            if (input && isVNodeWithEl(input)) {
                input.el.value = capitalize(input.el.value);
            } else {
                throw new Error("No input found in capitalize directive");
            }
        } else {
            throw new Error("Children are not an array in capitalize directive");
        }
    }
});

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount("#app");

update_characters()