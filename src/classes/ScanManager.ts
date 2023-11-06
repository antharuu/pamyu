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


    public getCleanBlocks(script: string | Block): Block {
        const blocks = typeof script === 'string' ? this.getBlocks(script) : script;

        return this.getFilteredBlocks(blocks).map(block => {
            if (typeof block === 'string') {
                return block;
            }

            return this.getCleanBlocks(block);
        });
    }

    public getBlocks(rawScript: string): Block {
        const lines = rawScript.split('\n');
        let startLine = 0;
        while (startLine < lines.length && !lines[startLine].trim()) {
            startLine++;
        }

        return this.processLines(lines, startLine).block;
    }

    private getFilteredBlocks(blocks: Block): Block {
        let isInsideMultiline = false;
        let lastsIsEmpty = false;

        // eslint-disable-next-line complexity
        return blocks.filter(block => {
            if (typeof block === 'string') {
                if (block.includes('"""')) {
                    isInsideMultiline = !isInsideMultiline;
                    if (!isInsideMultiline) {
                        lastsIsEmpty = false;
                    }
                }

                if (!isInsideMultiline && block.trim() === '') {
                    return false;
                } else if (isInsideMultiline) {
                    if (block.trim() === '') {
                        if (lastsIsEmpty) {
                            return false;
                        }

                        lastsIsEmpty = true;
                    }
                }

                return !this.isComment(block);
            }

            return true;
        });
    }

    // eslint-disable-next-line complexity
    private processLines(lines: string[], startLine: number, isInsideMultilineBlock: boolean = false): {
        nextLine: number;
        newIsInsideMultilineBlock: boolean;
        block: (string | Block)[]
    } {
        const block: Block = [];
        const currentIndentation = this.getIndentation(lines[startLine]);
        let i = startLine;
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
                const {
                    block: innerBlock,
                    nextLine,
                    newIsInsideMultilineBlock
                } = this.processLines(lines, i, isInsideMultilineBlock);
                isInsideMultilineBlock = newIsInsideMultilineBlock;
                block.push(this.cleanEndStartBlock(innerBlock));
                i = nextLine - 1;
            } else if (lineIndentation < currentIndentation) {
                break;
            } else {
                block.push(lines[i].trim());
            }
            i++;
        }

        return {block: this.cleanEndStartBlock(block), nextLine: i, newIsInsideMultilineBlock: isInsideMultilineBlock};
    }

    private cleanEndStartBlock(block: Block): Block {
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

    private isComment(line: string): boolean {
        return line.startsWith('#');
    }
}