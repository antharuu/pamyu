/* eslint-disable camelcase */
import {invoke} from '@tauri-apps/api/tauri';
import {ref} from 'vue';

import {State} from '../types/state.ts';

import {version} from '../../package.json';
import {path} from '../main';

import {updateScenesScipts} from './pamyu.ts';

type UpgradeStep = {
    version: string;
    method: (state: State) => void;
};

const isSaving = ref<boolean>(false);

/**
 * This `save_data` function is used to persist the current state of the application to a specified path.
 *
 * @param {object} state - The current application state.
 */
export async function saveData(state: State): Promise<void> {
    if (isSaving.value) return;
    isSaving.value = true;
    updateVersion(state);
    console.log('💾 Saving data to', path);
    await invoke('save_data', {path, data: JSON.stringify(state, null, 2)});
    if (state?.ScenesData) updateScenesScipts();
    isSaving.value = false;
}

export async function loadData(): Promise<object> {
    console.log('📂 Loading data from', path);
    const baseData = await invoke('load_data', {path}) as string | null;
    if (baseData) {
        try {
            return JSON.parse(baseData);
        } catch (e) {
            console.error(e);
        }
    }

    return {};
}

/**
 * The `getVersion` function converts a string representation of a software version into an ordered tuple.
 *
 * @param {string} stringVersion - A string representation of a version, such as "1.2.3".
 *
 * @returns {[number, number, number]} The returned array contains three elements: the major version number,
 * the minor version number, and the patch version number.
 */
function getVersion(stringVersion: string): [number, number, number] {
    return stringVersion.split('.').map((v: string) => parseInt(v)) as [number, number, number];
}

/**
 * The `is_version_lower` function compares two software versions given as strings.
 *
 * It considers major, minor, and patch versions in the comparison. Initially, it compares the major version numbers. If these
 * are equal, it proceeds to compare the minor version numbers. Finally, if the minor version numbers are also the same, it
 * compares the patch version numbers.
 *
 * @param {string} versionChecked - The first version string to compare, such as "1.2.3".
 * @param {string} versionToHave - The second version string to compare, such as "4.5.6".
 *
 * @returns {boolean} - Returns true if `versionChecked` is greater than `versionToHave`, otherwise false.
 */
function isVersionLower(versionChecked: string, versionToHave: string): boolean {
    const [aMajor, aMinor, aPatch] = getVersion(versionToHave);
    const [bMajor, bMinor, bPatch] = getVersion(versionChecked);

    if (aMajor > bMajor) {
        return true;
    } else if (aMajor === bMajor) {
        if (aMinor > bMinor) {
            return true;
        } else if (aMinor === bMinor) {
            return aPatch > bPatch;
        }
    }

    return false;
}

/**
 * `updateVersion` updates the version for the provided state object. It first retrieves the current software version from
 * the state. If the recently accessed version of the software is greater than the current one, it logs a message indicating
 * that the data needs to be updated.
 *
 * If the recently accessed version is less than the current one, an error is thrown stating that the user is using an
 * outdated version of the software. If the current and accessed versions are equal, it logs a message stating that
 * there's no need for a data update. Finally, it sets the state's version to the current version.
 *
 * @param {any} state - The state object for the application, which may or may not contain a 'Pamyu' object with a 'version' attribute.
 */
function updateVersion(state: State): void {
    const stateVersion = state?.Pamyu?.version ?? '0.0.0';

    if (isVersionLower(stateVersion, version)) {
        console.log(`⚡️ Updating data to new version, ${stateVersion} -> ${version}`);
        upgrade(stateVersion, state);
    } else if (version !== stateVersion) {
        throw new Error(`🚨 Data version is greater than current version, you are using an old version of Pamyu ${stateVersion} > ${version}`);
    }

    state.Pamyu = {version};
}

/**
 * Upgrades the state object to a specific version by executing a series of upgrade steps.
 *
 * @param {string} oldVersion - The current version of the state object.
 * @param {State} state - The state object to be upgraded.
 * @return {void}
 */
function upgrade(oldVersion: string, state: State): void {
    const upgrades: UpgradeStep[] = [
        {version: '0.0.8', method: upgradeTo_0_0_8},
        {version: '0.0.9', method: upgradeTo_0_0_9},
    ];

    upgrades.forEach((upgrade: UpgradeStep) => {
        if (isVersionLower(oldVersion, upgrade.version)) {
            console.log(`🚨 Updating to ${upgrade.version}`);
            upgrade.method(state);
        }
    });
}

/**
 * Upgrades to version 0.0.8.
 *
 * This upgrade adds the `CharactersData` object to the state, which contains the `characters` and `folders` attributes.
 *
 * @param {State} state - The state object to be upgraded.
 * @return {void}
 */
function upgradeTo_0_0_8(state: State): void {
    if (state?.CharactersData) {
        if (!state?.CharactersData?.characters) state.CharactersData.characters = [];
        if (!state?.CharactersData?.folders) state.CharactersData.folders = {};
    }
}

/**
 * Upgrades to version 0.0.9.
 *
 * This upgrade adds the `ScenesData` object to the state, which contains the `scenes` and `actions` attributes.
 *
 * @param {State} state - The state object to be upgraded.
 * @return {void}
 */
function upgradeTo_0_0_9(state: State): void {
    if (state?.ScenesData) {
        if (!state?.ScenesData?.scenes) state.ScenesData.scenes = [];
        if (!state?.ScenesData?.actions) state.ScenesData.actions = [];
    }
}