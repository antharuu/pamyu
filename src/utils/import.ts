import {invoke} from '@tauri-apps/api/tauri';

import {useScenesStore} from '../stores/scenesStore.ts';

import {path} from '../main.ts';

import {PathManager} from './path.ts';
import {getIndent} from './tools.ts';

const toCheck: string[] = [];
const toDelete: string[] = [];

const validFiles: string[] = [
    'gui.rpy',
    'options.rpy',
    'screens.rpy',
];

const checkFiles: string[] = [
    'script.rpy',
    'characters.rpy'
];

const gamePath = PathManager.lastGamePath ?? '';

function getCleanFileName(fileName: string): string {
    const path = fileName.replace(gamePath, '');
    return path.replace(/^[\\/]/, '');
}

function getOnlyFileName(fileName: string): string {
    // remove the extension
    const fileNameWithoutExtension = fileName.split('.')[0];

    // remove all before the last \ or /
    return fileNameWithoutExtension.split(/[\\/]/).pop() ?? '';
}

function checkKnownScene(fileName: string): boolean {
    const scenes = useScenesStore().getScenes;
    const scene = scenes.find((scene) => scene._id === fileName);
    return !!scene;
}

function checkPaterns(fileName: string): boolean {
    const scenesPatern = /^scenes[\\/](sc_).*/;
    return scenesPatern.test(fileName);
}

/**
 * Check if the scene is known by the app
 * @param fileName
 * @param completeFileName
 * @returns [needCheck, toRemove]
 */
function checkIfIsKnown(fileName: string, completeFileName: string): [boolean, boolean] {
    if (checkKnownScene(fileName)) return [false, false];
    if (validFiles.includes(completeFileName)) return [false, false];
    if (checkFiles.includes(completeFileName)) return [true, false];
    if (checkPaterns(completeFileName)) return [false, true];
    return [true, false];
}

export async function getAllProjectRenpyFiles(): Promise<void> {
    if (PathManager.isEmpty) {
        return;
    }

    const files = await invoke<string[]>('get_all_project_renpy_files', {path});
    console.log('🔍 Scanning project files...');

    const cleanFiles = files.map((file) => getCleanFileName(file));
    cleanFiles.forEach((file) => {
        const fileName = getOnlyFileName(file);
        const [needCheck, toRemove] = checkIfIsKnown(fileName, file);
        if (needCheck) {
            toCheck.push(file);
        } else if (toRemove) {
            toDelete.push(file);
        }
    });

    if (toCheck.length) {
        console.log('🗂️ Checked files:');
        for (const file of toCheck) {
            const fileContent = await invoke<string>('load_script', {path: path, file: file});
            console.log(fileContent);
            console.log(`${getIndent()}🟠 ${file}`);
        }
    }

    if (toDelete.length) {
        console.log('🧹 Delete files:');
        for (const file of toDelete) {
            const deleted = await invoke<boolean>('delete_file', {path: `${gamePath}/${file}`});
            if (deleted) {
                console.log(`${getIndent()}🔴 ${file}`);
            } else {
                throw new Error(`Error while deleting file: ${file}`);
            }
        }
    }

}