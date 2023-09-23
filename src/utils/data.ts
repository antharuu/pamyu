import {invoke} from "@tauri-apps/api/tauri";
import {path} from "../main";
import {version} from "../../package.json";
import {State} from "../types/state.ts";

/**
 * This `save_data` function is used to persist the current state of the application to a specified path.
 *
 * @param {object} state - The current application state.
 */
export function save_data(state: object) {
    update_version(state)
    // noinspection JSIgnoredPromiseFromCall
    invoke("save_data", {path, data: JSON.stringify(state, null, 2)})
}

export async function load_data(): Promise<object> {
    const baseData = await invoke("load_data", {path}) as string | null
    if (baseData) {
        try {
            return JSON.parse(baseData)
        } catch (e) {
            console.error(e)
        }
    }

    return {}
}

/**
 * The `get_version` function converts a string representation of a software version into an ordered tuple.
 *
 * @param {string} stringVersion - A string representation of a version, such as "1.2.3".
 *
 * @returns {[number, number, number]} The returned array contains three elements: the major version number,
 * the minor version number, and the patch version number.
 */
function get_version(stringVersion: string): [number, number, number] {
    return stringVersion.split(".").map((v: string) => parseInt(v)) as [number, number, number]
}

/**
 * The `is_version_greater_than` function compares two software versions given as strings.
 *
 * It considers major, minor, and patch versions in the comparison. Initially, it compares the major version numbers. If these
 * are equal, it proceeds to compare the minor version numbers. Finally, if the minor version numbers are also the same, it
 * compares the patch version numbers.
 *
 * @param {string} version_a - The first version string to compare, such as "1.2.3".
 * @param {string} version_b - The second version string to compare, such as "4.5.6".
 *
 * @returns {boolean} - Returns true if `version_a` is greater than `version_b`, otherwise false.
 */
function is_version_greater_than(version_a: string, version_b: string): boolean {
    const [a_major, a_minor, a_patch] = get_version(version_a)
    const [b_major, b_minor, b_patch] = get_version(version_b)

    if (a_major > b_major) {
        return true
    } else if (a_major === b_major) {
        if (a_minor > b_minor) {
            return true
        } else if (a_minor === b_minor) {
            return a_patch > b_patch
        }
    }

    return false
}

/**
 * `update_version` updates the version for the provided state object. It first retrieves the current software version from
 * the state. If the recently accessed version of the software is greater than the current one, it logs a message indicating
 * that the data needs to be updated.
 *
 * If the recently accessed version is less than the current one, an error is thrown stating that the user is using an
 * outdated version of the software. If the current and accessed versions are equal, it logs a message stating that
 * there's no need for a data update. Finally, it sets the state's version to the current version.
 *
 * @param {any} state - The state object for the application, which may or may not contain a 'Pamyu' object with a 'version' attribute.
 */
function update_version(state: State) {
    const stateVersion = state?.Pamyu?.version ?? "0.0.0"

    if (is_version_greater_than(version, stateVersion)) {
        console.log(`⚡️ Updating data to new version, ${stateVersion} -> ${version}`)
    } else if (version !== stateVersion) {
        throw new Error(`🚨 Data version is greater than current version, you are using an old version of Pamyu ${stateVersion} > ${version}`)
    } else {
        console.log("👌 No need to update data")
    }

    state.Pamyu = {version}
}