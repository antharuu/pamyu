import {ScriptVar} from '../types/globals.ts';

export class Script {
    private static lines: string[] = [];

    static set(script: string): void {
        this.lines = script.split('\n');
    }

    private static filterLine(line: string): boolean {
        return !line.trim().startsWith('#') && line.trim().length > 0;
    }

    static getVars(vars: Record<string, string>): Record<string, ScriptVar> {
        const res: Record<string, ScriptVar> = {};
        for (const [key, value] of Object.entries(vars)) {
            res[key] = Script.getVar(value);
        }
        return res;
    }

    static getVar(varName: string): ScriptVar {
        const index = this.lines.findIndex(line => line.trim().includes(varName) && !line.trim().startsWith('#'));
        const line = this.lines[index];
        if (!line || !Script.filterLine(line)) return null;
        return Script.getValue(line, index);
    }

    private static getValue(line: string, index: number): ScriptVar {
        const match = line.match(/=\s*(.+)/);
        if (!match) {
            console.warn(`⚠️ Line ${index + 1} is not a valid variable declaration`);
            return null;
        }

        const valueStr = match[1].trim();

        if (valueStr === 'None') {
            return null;
        } else if (valueStr === 'True') {
            return true;
        } else if (valueStr === 'False') {
            return false;
        } else if (/^\d+(\.\d+)?$/.test(valueStr)) {
            return parseFloat(valueStr);
        } else if (/^"(.+)"$/.test(valueStr)) {
            return valueStr.slice(1, -1);
        } else {
            if (valueStr.includes('"""') || valueStr.includes('\'\'\'')) {
                return Script.getMultilineStr(valueStr, index);
            }

            return valueStr;
        }
    }

    private static getMultilineStr(valueStr: string, index: number): string {
        const delimiter = valueStr.includes('"""') ? '"""' : '\'\'\'';
        const startIndex = index + 1;
        const endIndex = this.lines.findIndex((line, i) => i >= startIndex && line.includes(delimiter));
        const lines = this.lines.slice(startIndex, endIndex);
        return lines.map(line => line.trim()).join('\n');
    }
}