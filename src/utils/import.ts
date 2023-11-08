import {invoke} from '@tauri-apps/api/tauri';

import {useScenesStore} from '../stores/scenesStore.ts';

import {ScanManager} from '../classes/ScanManager.ts';
import {path} from '../main.ts';

import {PathManager} from './path.ts';
import {getIndent} from './tools.ts';

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

    const files = await getProjectFiles();
    const categorizedFiles = categorizeFiles(files);
    await checkFilesAndPrint(categorizedFiles.toCheck);
    await deleteFilesAndPrint(categorizedFiles.toDelete);
}

async function getProjectFiles(): Promise<string[]> {
    console.log('🔍 Scanning project files...');
    return invoke<string[]>('get_all_project_renpy_files', {path}).then(files =>
        files.map((file) => getCleanFileName(file)));
}

function categorizeFiles(files: string[]): { toCheck: string[], toDelete: string[] } {
    const toCheck: string[] = [];
    const toDelete: string[] = [];

    files.forEach((file) => {
        const fileName = getOnlyFileName(file);
        const [needCheck, toRemove] = checkIfIsKnown(fileName, file);
        if (needCheck) {
            toCheck.push(file);
        } else if (toRemove) {
            toDelete.push(file);
        }
    });

    return {toCheck, toDelete};
}

async function checkFilesAndPrint(filesToCheck: string[]): Promise<void> {
    if (filesToCheck.length) {
        console.log('🗂️ Checked files:');
        for (const file of filesToCheck) {
            // ignore files in the "tl" folder
            if (/^tl[\\/].*/.test(file)) {
                continue;
            }

            const fileContent = await invoke<string>('load_script', {path: path, file: file});
            console.log(`${getIndent()}🟠 ${file}`);
            const cb = ScanManager.i.getLabels(fileContent);
            console.log(cb);
        }
    }
}

async function deleteFilesAndPrint(filesToDelete: string[]): Promise<void> {
    if (filesToDelete.length) {
        console.log('🧹 Delete files:');
        for (const file of filesToDelete) {
            const deleted = await invoke<boolean>('delete_file', {path: `${gamePath}/${file}`});
            if (deleted) {
                console.log(`${getIndent()}🔴 ${file}`);
            } else {
                throw new Error(`Error while deleting file: ${file}`);
            }
        }
    }
}