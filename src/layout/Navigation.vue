<script setup lang="ts">
import Icon from "../components/Icon.vue";

const navigationItems = [
  {name: "Settings", icon: "settings", path: "/settings",},
  {name: "Characters", icon: "face", path: "/characters",},
  {name: "Assets", icon: "image", path: "/assets",},
  {name: "Scenes", icon: "theater_comedy", path: "/scenes",},
];
</script>

<template>
  <div class="navigation">
    <a href="https://github.com/antharuu/pamyu" target="_blank">
      <img class="navigation__logo" src="pamyu.svg" alt="logo"/>
    </a>
    <nav class="navigation__nav">
      <router-link :to="item.path" v-for="item in navigationItems" :key="item.name" :active-class="'active'">
        <Icon :name="item.icon"/>
        <span>{{ item.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  align-items: center;

  &__logo {
    padding: 20px;
    width: 100%;
    aspect-ratio: 1 / 1;
    margin-bottom: 40px;
    transition: transform .2s ease-in-out;
    transform: scale(1);

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
    display: grid;
    align-items: center;

    a {
      position: relative;
      color: var(--color-white);
      text-decoration: none;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: .5rem;
      padding: 1rem;

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
    }
  }
}
</style>