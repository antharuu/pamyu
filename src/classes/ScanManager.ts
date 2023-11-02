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


    public getCleanBlocks(rawScript: string): Block {
        const blocks = this.getBlocks(rawScript);
        return blocks;
    }

    public getBlocks(rawScript: string): Block {
        const lines = rawScript.split('\n');
        let startLine = 0;
        while (startLine < lines.length && !lines[startLine].trim()) {
            startLine++;
        }
        const blocks = this.processLines(lines, startLine).block;
        console.log(blocks);
        return blocks;
    }

    private processLines(lines: string[], startLine: number): { block: Block, nextLine: number } {
        const block: Block = [];
        const currentIndentation = this.getIndentation(lines[startLine]);
        let i = startLine;
        let isInsideMultilineBlock = false;
        let lineIndentation = 0;

        while (i < lines.length) {
            if (!isInsideMultilineBlock) {
                lineIndentation = this.getIndentation(lines[i]);
            }

            if (lines[i].includes('"""')) {
                isInsideMultilineBlock = !isInsideMultilineBlock;
            }

            if (lines[i].trim() === '') {
                block.push('');
                i++;
                continue;
            }

            if (lineIndentation > currentIndentation) {
                const {block: innerBlock, nextLine, newIsInsideMultilineBlock} = this.processLines(lines, i, isInsideMultilineBlock);
                isInsideMultilineBlock = newIsInsideMultilineBlock;
                block.push(this.cleanBlock(innerBlock));
                i = nextLine - 1;
            } else if (lineIndentation < currentIndentation) {
                break;
            } else {
                block.push(lines[i].trim());
            }
            i++;
        }

        return {block: this.cleanBlock(block), nextLine: i, newIsInsideMultilineBlock: isInsideMultilineBlock};
    }

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

    private getIndentation(line: string): number {
        let indentation = 0;
        while (line[indentation] === ' ') {
            indentation++;
        }
        return indentation;
    }

}