<script setup lang="ts">
import {computed} from 'vue';

import {useCharacterStore} from '../stores/characterStore.ts';

import ActionButton from '../components/ActionButton.vue';
import CharacterListElement from '../components/CharacterListElement.vue';
import Icon from '../components/Icon.vue';

import ListContainer from '../layout/ListContainer.vue';
import PageLayout from '../layout/PageLayout.vue';

const characters = computed(() => useCharacterStore().getCharacters);
const folders = computed(() => useCharacterStore().getCharactersFolders);

function deleteFolder(name: string): void {
    useCharacterStore().deleteFolder(name);
}
</script>

<template>
  <PageLayout page-title="characters">
    <ListContainer>
      <template #list>
        <router-link :to="{name: 'character.create'}">
          <ActionButton block>
            {{ $t("create_character") }}
          </ActionButton>
        </router-link>

        <router-link :to="{name: 'character.create-folder'}">
          <ActionButton
            block
            outlined
          >
            {{ $t("create_folder") }}
          </ActionButton>
        </router-link>

        <div class="characters">
          <div
            v-if="folders.length > 0"
            class="folders"
          >
            <div
              v-for="folder in [...folders, '__others']"
              :key="folder"
              class="folder"
            >
              <div class="folder">
                <div
                  class="folder__title"
                >
                  {{ folder !== '__others' ? folder : $t('others') }}
                  <div class="folder__title__actions">
                    <span
                      v-if="folder !== '__others'"
                      @click="deleteFolder(folder)"
                    >
                      <Icon name="delete" />
                    </span>
                  </div>
                </div>
                <div class="folder__characters">
                  <div
                    v-for="character in characters"
                    :key="character._id"
                    class="folder__character"
                  >
                    <CharacterListElement
                      v-if="character.folder === folder || (folder === '__others' && character.folder === undefined)"
                      :key="character._id"
                      :character-id="character._id"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              v-for="character in characters"
              :key="character._id"
              class="character__container"
            >
              <CharacterListElement
                v-if="character.folder === undefined"
                :key="character._id"
                :character-id="character._id"
              />
            </div>
          </div>
        </div>
      </template>
      <router-view />
    </ListContainer>
  </PageLayout>
</template>

<style lang="scss" scoped>
.characters {
    display: grid;
    grid-template-columns: 1fr;

    .character__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .character {
        margin-bottom: 1rem;
        width: 100%;
    }

    .folder {
        position: relative;
        margin-bottom: 3rem;

        &:not(:last-child)::after {
            content: '';
            position: absolute;
            top: calc(100% + 1.5rem);
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--color-background-light);
        }

        &__title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            letter-spacing: .075rem;
            font-size: 1.2rem;
            text-transform: uppercase;
            color: var(--color-accent);
            margin-bottom: 1rem;
            cursor: default;

            &__actions {
                opacity: 0;
                display: flex;
                align-items: center;
                gap: .5rem;
                margin-left: auto;
                font-size: .25rem;
                transition: opacity .2s ease-in-out;

                span {
                    cursor: pointer;
                }
            }

            &:hover {
                .folder__title__actions {
                    opacity: 1;
                }
            }
        }

        &__characters {
            width: 100%;
        }

        &__character {
            margin-bottom: 1rem;

            .character {
                display: block;
            }
        }
    }
}
</style>