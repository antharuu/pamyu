<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {invoke} from "@tauri-apps/api/tauri";
import {faker} from '@faker-js/faker';

const winDir = ref("D:/Maana/RenpyUiTestProject");
const path = ref<string>(winDir.value);

const script = ref<string>("");
const error = ref("");

function randomize() {
  const name = faker.person.firstName();
  const char = {
    id: name[0].toLowerCase(),
    name,
    color: faker.color.rgb()
  }
  script.value = `define ${char.id} = Character("${char.name}", color="${char.color}")

label start:
    ${char.id} "Hello, world!"

    return
`
}

watchEffect(async () => {
  error.value = "";
  await update();
});

async function update() {
  script.value = <string>await invoke("load_project", {path: path.value}).catch((e) => {
    error.value = e;
  })
}

async function save() {
  invoke("save_new_script", {path: winDir.value, content: script.value}).catch((e) => {
    error.value = e;
  }).then(() => update())
}
</script>

<template>
  <div class="row">
    <input type="text" v-model.lazy="path"/>
    <button @click="randomize">RANDOMIZE</button>
    <button @click="save">SAVE</button>
  </div>

  <pre v-if="error" class="error">{{ error }}</pre>
  <textarea v-model="script"></textarea>
</template>

<style scoped>
input {
  padding: 10px;
  width: 100%;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 0.25em;
  box-sizing: border-box;
  box-shadow: none;
}

button {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 0.25em;
  box-sizing: border-box;
  box-shadow: none;
  background-color: #fff;
  cursor: pointer;
}

.error {
  background-color: #e05f5f;
  padding: 10px;
  color: #fff;
  border-radius: 0.25em;
}

textarea {
  margin-top: 10px;
  width: 100%;
  height: 650px;
  font-size: 1em;
  display: block;
  border: 1px solid #ccc;
  border-radius: 0.25em;
  box-sizing: border-box;
  box-shadow: none;
  background-color: #fff;
  resize: none;
}

* {
  opacity: .5;
}
</style>