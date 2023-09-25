import {Color} from '../types/globals.ts';

/**
 * Generates a random string token.
 *
 * This function generates a random string token of the specified length from the characterset of uppercase and lowercase
 * alphabets and digits. The length is 32 by default, but can be adjusted by providing the length as an argument to the
 * function.
 *
 * @param {number} lentgh - The length of the random string token to be generated. Defaults to 32.
 * @returns {string} A random alphanumeric string of the specified length.
 */
export function getRandomToken(lentgh: number = 32): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < lentgh; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getColorAsHex(color: Color): string {
    return color.startsWith('#') ? color : '#' + color;
}

export function deepAssign<T extends Record<string, unknown>>(target: T, ...sources: Partial<T>[]): T {
    if (isPrimitive(target)) {
        return target;
    }

    for (const source of sources) {
        if (isPrimitive(source)) {
            continue;
        }

        assignSourceToTarget<T>(target, source);
    }

    return target;
}

function isPrimitive(value: unknown): boolean {
    return value === null || typeof value !== 'object';
}

function assignSourceToTarget<T extends Record<string, unknown>>(target: T, source: Partial<T>): void {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const value = source[key as keyof T];

            if (isPrimitive(value)) {
                target[key as keyof T] = value as T[keyof T];
            } else {
                prepareTargetForDeepAssign<T>(target, key, value);
                deepAssign(target[key as keyof T] as Record<string, unknown>, value as unknown as Record<string, unknown>);
            }
        }
    }
}

function prepareTargetForDeepAssign<T extends Record<string, unknown>>(target: T, key: keyof T, value: unknown): void {
    if (Array.isArray(value)) {
        if (!Array.isArray(target[key])) {
            target[key] = [] as T[keyof T];
        }
    } else {
        if (isPrimitive(target[key])) {
            target[key] = {} as T[keyof T];
        }
    }
}

export function getUndefinedIfEmptyString(str: string | unknown): string | undefined {
    if (typeof str !== 'string') return undefined;
    return str.trim().length === 0 ? undefined : str.trim();
}

export function getCleanName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

export function truncatePath(path: string, maxLength: number): string {
    if (path.length <= maxLength) {
        return path;
    }

    const ellipsis = '.../';
    const parts = path.split('/');

    // Si on a seulement le disque (par exemple "C:/") et la dernière partie (le nom du fichier/dossier),
    // alors c'est le minimum que nous devons garder.
    if (parts.length <= 2) {
        const diff = maxLength - parts[parts.length - 1].length;
        if (diff > 0) {
            return parts[0].substr(0, diff) + '/' + parts[parts.length - 1];
        }
        return ellipsis + parts[parts.length - 1].substr(0, maxLength - ellipsis.length);
    }

    // Commence par garder la première et la dernière partie
    let truncatedPath = parts[0] + '/' + ellipsis + parts[parts.length - 1];
    if (truncatedPath.length > maxLength) {
        return ellipsis + parts[parts.length - 1].substr(0, maxLength - ellipsis.length);
    }

    // Essayez d'ajouter des parties intermédiaires tant que nous ne dépassons pas la longueur maximale
    for (let i = parts.length - 2; i > 0; i--) {
        const tempPath = truncatedPath.replace(ellipsis, parts[i] + '/' + ellipsis);

        if (tempPath.length > maxLength) {
            break;
        }

        truncatedPath = tempPath;
    }

    return truncatedPath;
}

export function unwrap(entry: string | undefined, prev: string = '', next: string = ''): string {
    if (!entry) return '';
    if (entry.startsWith(prev) && entry.endsWith(next)) {
        const startIndex = prev.length;
        const endIndex = entry.length - next.length;
        return entry.slice(startIndex, endIndex);
    } else {
        return entry;
    }
}