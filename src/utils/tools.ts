import {Color} from "../types/globals.ts";

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
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < lentgh; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function colorAsString(color: Color): string {
    return color.startsWith("#") ? color : "#" + color;
}


/**
 * Deeply assigns properties from the source object(s) to the target object.
 *
 * This is a utility function used for deeply merging of objects. It helps to combine the properties of two or more objects together into
 * the first object (target object).
 * This function is especially useful for merging default configuration objects with user-provided configuration objects, where the
 * configurations are nested.
 *
 * @param {T extends Record<string, unknown>} target - The target object where properties will be copied to.
 * @param {...Partial<T>[]} sources - One or more source objects from which properties will be copied.
 * @returns {T} - It returns the target object with deeply copied properties from source objects.
 *
 * @template T
 */
export function deepAssign<T extends Record<string, unknown>>(target: T, ...sources: Partial<T>[]): T {
    if (target === null || typeof target !== "object") {
        return target;
    }

    for (const source of sources) {
        if (source === null || typeof source !== "object") {
            continue;
        }

        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                const value = source[key as keyof T];
                if (typeof value === "object" && value !== null) {
                    if (Array.isArray(value)) {
                        if (!Array.isArray(target[key as keyof T])) {
                            target[key as keyof T] = [] as T[keyof T];
                        }
                    } else {
                        if (typeof target[key as keyof T] !== "object" || target[key as keyof T] === null) {
                            target[key as keyof T] = {} as T[keyof T];
                        }
                    }
                    deepAssign(target[key as keyof T] as Record<string, unknown>, value);
                } else {
                    target[key as keyof T] = value as T[keyof T];
                }
            }
        }
    }

    return target;
}

export function undefinedStringIfEmpty(str: string | unknown): string | undefined {
    if (typeof str !== "string") return undefined;
    return str.trim().length === 0 ? undefined : str.trim();
}