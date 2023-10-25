<script setup lang="ts">
import {computed} from 'vue';

import {PathManager} from '../utils/path.ts';
import {capitalize} from '../utils/tools';

import Icon from '../components/Icon.vue';

import PamyuLogo from '../assets/pamyu.svg';

type MenuItem = {
    name: string;
    icon: string;
    path: string;
    disabled?: boolean;
    order: number;
}

const basesItems: MenuItem[] = [
    {name: 'projects.title', icon: 'folder_copy', path: '/projects', order: 0},
];

const loadedItems: MenuItem[] = [
    {name: 'game.title', icon: 'sports_esports', path: '/game', order: 1},
    {name: 'characters.title', icon: 'face', path: '/characters', order: 2},
    {name: 'assets.title', icon: 'image', path: '/assets', disabled: true, order: 3},
    {name: 'scenes.title', icon: 'theater_comedy', path: '/scenes', order: 4},
    {name: 'variables.title', icon: 'switches', path: '/variables', disabled: true, order: 5},
    {name: 'scripts.title', icon: 'code', path: '/scripts', disabled: true, order: 6},
    {name: 'translations.title', icon: 'translate', path: '/translations', disabled: true, order: 7},
    {name: 'settings.title', icon: 'settings', path: '/settings', order: 20},
];

const navigationItems = computed<MenuItem[]>(() =>
    (PathManager.isEmpty ? basesItems : [...basesItems, ...loadedItems])
        .filter(item => !item.disabled || PathManager.isEmpty)
        .sort((a, b) => a.order - b.order));
</script>

<template>
  <div class="navigation">
    <a
      href="https://github.com/antharuu/pamyu"
      target="_blank"
    >
      <img
        class="navigation__logo"
        :src="PamyuLogo"
        alt="logo"
      >
    </a>
    <nav class="navigation__nav">
      <span
        v-for="item in navigationItems"
        :key="item.name"
        class="navigation__link"
      >
        <router-link
          v-if="!item.disabled"
          :key="item.name"
          :to="item.path"
          :active-class="'active'"
          class="navigation__link-element"
        >
          <Icon :name="item.icon" />
          <span>{{ capitalize($t(item.name)) }}</span>
        </router-link>
        <span
          v-else
          class="navigation__link-element navigation__link-element--disabled"
          :title="$t('not_implemented')"
        >
          <Icon :name="item.icon" />
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
    font-size: .9rem;
    width: 90px;

    &__logo {
        padding: 1.5rem;
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
                color: var(--color-text);
                text-decoration: none;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: .5rem;
                padding: clamp(.6rem, 1.75vh, 1rem) 1rem;

                &:hover {
                    color: var(--color-accent-dark);
                }

                &::before {
                    content: "";
                    width: 4px;
                    background-color: var(--color-accent);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    top: 0;
                    border-radius: 0 10px 10px 0;
                    opacity: 0;
                }

                &.active {
                    color: var(--color-accent);
                    pointer-events: none;

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