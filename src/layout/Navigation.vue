<script setup lang="ts">
import Icon from "../components/Icon.vue";

const navigationItems = [
  {name: "Home", icon: "home", path: "/",},
  {name: "About", icon: "info", path: "/about",},
  {name: "Settings", icon: "settings", path: "/settings",},
];
</script>

<template>
  <div class="navigation">
    <img class="navigation__logo" src="pamyu.svg" alt="logo"/>
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
  padding: 20px;

  &__logo {
    width: 100%;
    aspect-ratio: 1 / 1;
    margin-bottom: 20px;
  }

  &__nav {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    a {
      color: var(--color-white);
      text-decoration: none;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: .5rem;

      &:hover {
        color: var(--color-lightgrey);
      }

      &.active {
        color: var(--color-primary);
      }
    }
  }
}
</style>