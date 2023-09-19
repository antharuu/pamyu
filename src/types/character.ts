import {Color} from "./globals";

export type Character = {
    _id: string; // This is a unique identifier for the character
    name: string;
} & Partial<{
    color: Color;
    image: string;
}>