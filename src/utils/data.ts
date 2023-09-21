import {invoke} from "@tauri-apps/api/tauri";
import {path} from "../main";
import {version} from "../../package.json";

export function save_data(state: object) {
    const updatedState = update_version(state)
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

function get_version(stringVersion: string): [number, number, number] {
    return stringVersion.split(".").map((v: string) => parseInt(v)) as [number, number, number]
}

function is_version_greater_than(version1: string, version2: string): boolean {
    const [v1, v2, v3] = get_version(version1)
    const [v4, v5, v6] = get_version(version2)

    if (v1 > v4) {
        return true
    } else if (v1 === v4) {
        if (v2 > v5) {
            return true
        } else if (v2 === v5) {
            return v3 > v6
        }
    }

    return false
}

function update_version(state: any) {
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