<script setup lang="ts">
import Icon from "../components/Icon.vue";
import {capitalize} from "../utils/tools";
import PamyuLogo from "../assets/pamyu.svg";

const navigationItems = [
    {name: "project", icon: "folder", path: "/project", disabled: true,},
    {name: "characters", icon: "face", path: "/characters",},
    {name: "assets", icon: "image", path: "/assets", disabled: true,},
    {name: "scenes", icon: "theater_comedy", path: "/scenes", disabled: true,},
    {name: "variables", icon: "switches", path: "/variables", disabled: true,},
    {name: "scripts", icon: "code", path: "/scripts", disabled: true,},
    {name: "translations", icon: "translate", path: "/translations", disabled: true,},
    {name: "settings", icon: "settings", path: "/settings"},
];
</script>

<template>
    <div class="navigation">
        <a href="https://github.com/antharuu/pamyu" target="_blank">
            <img class="navigation__logo" :src="PamyuLogo" alt="logo"/>
        </a>
        <nav class="navigation__nav">
            <span class="navigation__link" v-for="item in navigationItems" :key="item.name">
                <router-link
                    v-if="!item.disabled"
                    :to="item.path"
                    :key="item.name"
                    :active-class="'active'"
                    class="navigation__link-element"
                >
                    <Icon :name="item.icon"/>
                    <span>{{ capitalize($t(item.name)) }}</span>
                </router-link>
                <span
                    v-else
                    class="navigation__link-element navigation__link-element--disabled"
                    :title="$t('not_implemented')"
                >
                    <Icon :name="item.icon"/>
                    {{ capitalize($t(item.name)) }}
                </span>
            </span>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
.navigation {
    align-items: center;
    user-select: none;

    &__logo {
        padding: 20px;
        width: 100%;
        aspect-ratio: 1 / 1;
        transition: transform .2s ease-in-out;
        transform: scale(1);
        height: 120px;

        @media screen and (height < 860px) {
            height: 90px;
        }

        &:hover {
            transform: scale(1.1);
        }

        &:active {
            transform: scale(1.05);
        }
    }

    &__nav {
        width: 100%;
        margin-top: auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: calc(100vh - 120px);

        @media screen and (height < 860px) {
            height: calc(100vh - 90px);
        }

        .navigation__link {
            display: contents;

            .navigation__link-element {
                position: relative;
                color: var(--color-white);
                text-decoration: none;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: .5rem;
                padding: clamp(.6rem, 1.75vh, 1rem) 1rem;

                &:hover {
                    color: var(--color-lightgrey);
                }

                &::before {
                    content: "";
                    width: 4px;
                    background-color: var(--color-primary);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    top: 0;
                    border-radius: 0 10px 10px 0;
                    opacity: 0;
                }

                &.active {
                    color: var(--color-primary);

                    &::before {
                        opacity: 1;
                    }
                }

                &--disabled {
                    opacity: .5;
                    cursor: not-allowed;
                }
            }
        }
    }
}
</style>