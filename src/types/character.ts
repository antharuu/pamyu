import {Color} from './globals';

export type Character = {
    _id: string; // This is a unique identifier for the character
    name: string;
} & Partial<{
    color: Color; // Color of the character's name
    kind: string; // On who the character is based on
    // image: string; // The character's image tag
    // voice_tag: string; // The character's voice tag
    what_prefix: string; // The character's prefix of text
    what_suffix: string; // The character's suffix of text
    who_prefix: string; // The character's prefix of name
    who_suffix: string; // The character's suffix of name
}>