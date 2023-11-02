import {Block} from '../types/script.ts';

/**
 * Represents a ScanManager object.
 */
export class ScanManager {
    private static __instance: ScanManager;

    private constructor() {
    }

    /**
     * Returns an instance of ScanManager if it exists, otherwise creates a new instance and returns it.
     *
     * @returns {ScanManager} - An instance of ScanManager.
     */
    static get i(): ScanManager {
        if (!ScanManager.__instance) {
            ScanManager.__instance = new ScanManager();
        }

        return ScanManager.__instance;
    }

    /**
     * Scans the given raw script and returns a Block object.
     *
     * @param {string} rawScript - The raw script to be scanned.
     * @returns {Block} - The scanned Block object.
     */
    public scan(rawScript: string): Block {
        const lines = rawScript.split('\n');
        let startLine = 0;
        while (startLine < lines.length && !lines[startLine].trim()) {
            startLine++;
        }
        return this.processLines(lines, startLine).block;
    }

    /**
     * Processes a set of lines starting from a given line number.
     *
     * @param {string[]} lines - The set of lines to process.
     * @param {number} startLine - The line number to start processing from.
     * @returns {{ block: Block, nextLine: number }} - The processed block and the next line number.
     */
    private processLines(lines: string[], startLine: number): { block: Block, nextLine: number } {
        const block: Block = [];
        const currentIndentation = this.getIndentation(lines[startLine]);
        let i = startLine;

        while (i < lines.length) {
            const lineIndentation = this.getIndentation(lines[i]);

            if (lines[i].trim() === '') {
                block.push('');
                i++;
                continue;
            }

            if (lineIndentation > currentIndentation) {
                const {block: innerBlock, nextLine} = this.processLines(lines, i);
                block.push(this.cleanBlock(innerBlock));
                i = nextLine - 1; // -1 car la boucle ajoutera +1
            } else if (lineIndentation < currentIndentation) {
                break;
            } else {
                block.push(lines[i].trim());
            }
            i++;
        }

        return {block: this.cleanBlock(block), nextLine: i};
    }

    /**
     * Cleans the given block by removing empty lines at the beginning and at the end.
     *
     * @param {Block} block - The block to be cleaned.
     * @returns {Block} - The cleaned block.
     */
    private cleanBlock(block: Block): Block {
        // Supprime les lignes vides au début du bloc
        while (block.length && block[0] === '') {
            block.shift();
        }

        // Supprime les lignes vides à la fin du bloc
        while (block.length && block[block.length - 1] === '') {
            block.pop();
        }

        return block;
    }

    /**
     * Returns the indentation level of a given line.
     *
     * @param {string} line - The line to determine the indentation level of.
     * @return {number} The indentation level of the line.
     */
    private getIndentation(line: string): number {
        let indentation = 0;
        while (line[indentation] === ' ') {
            indentation++;
        }
        return indentation;
    }

}