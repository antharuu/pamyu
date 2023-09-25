import {Path} from '../types/path.ts';

import {getRandomToken} from './tools.ts';

export class PathManager {
    private static storageKey = 'pamyu-paths';

    private static savedPaths: Path[] = [];

    static getAll(): Path[] {
        if (PathManager.savedPaths.length) {
            return PathManager.savedPaths;
        }

        const storedData = localStorage.getItem(this.storageKey);
        const returnPath = storedData ? JSON.parse(storedData) : [];

        PathManager.savedPaths = returnPath;

        if (returnPath.length === 1) {
            PathManager.setAsLast(returnPath[0]._id);
        }

        return returnPath;
    }

    static get(id: string): Path | null {
        const paths = this.getAll();
        return paths.find(p => p._id === id) || null;
    }

    static add(path: string): void {
        const paths = this.getAll();

        const existingPath = paths.find(p => p.path === path);
        if (existingPath) {
            PathManager.setAsLast(existingPath._id);
            console.warn(`A path with the same value already exists: ${path}`);
            return;
        }

        const newPath: Path = {
            _id: getRandomToken(16),
            path,
            isLast: false
        };
        paths.push(newPath);
        localStorage.setItem(this.storageKey, JSON.stringify(paths));
        // refresh app
        window.location.reload();
    }

    static delete(id: string): void {
        const paths = this.getAll();
        const filteredPaths = paths.filter(p => p._id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filteredPaths));
    }

    static get last(): Path | null {
        const paths = this.getAll();
        return paths.find(p => p.isLast) || null;
    }

    static setAsLast(id: string): void {
        const paths = this.getAll();
        paths.forEach(p => p.isLast = p._id === id);
        localStorage.setItem(this.storageKey, JSON.stringify(paths));
    }

    static get isEmpty(): boolean {
        return !this.getAll().length;
    }
}