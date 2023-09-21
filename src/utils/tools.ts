import {Color} from "../types/globals.ts";

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
    if (typeof color === "string") {
        return color.startsWith("#") ? color : "#" + color;
    }

    const {r, g, b} = color;

    const rHex = r.toString(16).padStart(2, "0");
    const gHex = g.toString(16).padStart(2, "0");
    const bHex = b.toString(16).padStart(2, "0");

    return `#${rHex}${gHex}${bHex}`;
}


export function deepAssign(target: any, ...sources: any[]): any {
    if (target === null || typeof target !== "object") {
        return target;
    }

    for (const source of sources) {
        if (source === null || typeof source !== "object") {
            continue;
        }

        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === "object" && source[key] !== null) {
                    // Créez un nouvel objet si nécessaire pour éviter des références
                    if (!target.hasOwnProperty(key)) {
                        target[key] = Array.isArray(source[key]) ? [] : {};
                    }
                    deepAssign(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}