import {clamp} from './math.ts';

function hexToRgb(hex: string): [number, number, number] {
    // Supprimer le caractère # au début si présent
    const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

    if (cleanHex.length === 3) {
        return [
            parseInt(cleanHex.charAt(0) + cleanHex.charAt(0), 16),
            parseInt(cleanHex.charAt(1) + cleanHex.charAt(1), 16),
            parseInt(cleanHex.charAt(2) + cleanHex.charAt(2), 16),
        ];
    }

    return [
        parseInt(cleanHex.substring(0, 2), 16),
        parseInt(cleanHex.substring(2, 4), 16),
        parseInt(cleanHex.substring(4, 6), 16),
    ];
}

function rgbToHex(r: number, g: number, b: number): string {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

export function getDarkenColor(color: string, amount: number): string {
    const [r, g, b] = hexToRgb(color);
    const trueAmount = clamp(amount / 100, 0, 1);

    const newR = clamp(Math.round(r * (1 - trueAmount)), 0, 255);
    const newG = clamp(Math.round(g * (1 - trueAmount)), 0, 255);
    const newB = clamp(Math.round(b * (1 - trueAmount)), 0, 255);

    return rgbToHex(newR, newG, newB);
}

export function getLightenColor(color: string, amount: number): string {
    const [r, g, b] = hexToRgb(color);
    const trueAmount = clamp(amount / 100, 0, 1);

    const newR = clamp(Math.round(r + (255 - r) * trueAmount), 0, 255);
    const newG = clamp(Math.round(g + (255 - g) * trueAmount), 0, 255);
    const newB = clamp(Math.round(b + (255 - b) * trueAmount), 0, 255);

    return rgbToHex(newR, newG, newB);
}