import {ScriptVar} from '../types/globals.ts';

import {Config} from './config.ts';

export class Script {
    private static lines: string[] = [];

    static setCurrentScript(script: string): void {
        this.lines = script.split('\n');
    }

    private static filterLine(line: string): boolean {
        return !line.trim().startsWith('#') && line.trim().length > 0;
    }

    static getVars(varNames: string[]): Record<string, ScriptVar> {
        const res: Record<string, ScriptVar> = {};
        varNames.forEach(varName => {
            const key = Config.getKeyFromName(varName);
            if (!key) return;
            res[varName] = Script.getVar(key);
        });
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
        return this.determineValue(valueStr, index);
    }

    private static determineValue(valueStr: string, index: number): ScriptVar {
        const valueMap: { [key: string]: ScriptVar } = {
            'None': null,
            'True': true,
            'False': false
        };

        if (valueMap.hasOwnProperty(valueStr)) {
            return valueMap[valueStr];
        }
        if (this.isNumeric(valueStr)) {
            return parseFloat(valueStr);
        }
        if (this.isStringLiteral(valueStr)) {
            return valueStr.slice(1, -1);
        }
        if (this.isMultilineString(valueStr)) {
            return Script.getMultilineStr(valueStr, index);
        }
        return valueStr;
    }

    private static isNumeric(valueStr: string): boolean {
        return /^\d+(\.\d+)?$/.test(valueStr);
    }

    private static isStringLiteral(valueStr: string): boolean {
        return /^"(.+)"$/.test(valueStr);
    }

    private static isMultilineString(valueStr: string): boolean {
        return valueStr.includes('"""') || valueStr.includes('\'\'\'');
    }

    private static getMultilineStr(valueStr: string, index: number): string {
        const delimiter = valueStr.includes('"""') ? '"""' : '\'\'\'';
        const startIndex = index + 1;
        const endIndex = this.lines.findIndex((line, i) => i >= startIndex && line.includes(delimiter));
        const lines = this.lines.slice(startIndex, endIndex);
        return lines.map(line => line.trim()).join('\n');
    }

    static async setVars(param: { [key: string]: ScriptVar }): Promise<string> {
        for (const [key, value] of Object.entries(param)) {
            this.setVar(key, value);
        }

        return this.lines.join('\n');
    }

    private static setVar(key: string, value: ScriptVar): void {
        const index = this.findVarLineIndex(key);
        if (index === -1) {
            console.warn(`⚠️ Variable ${key} not found`);
            return;
        }

        let valueStr = this.convertValueToString(value, index);
        if (!valueStr) {
            console.warn(`⚠️ Unsupported value type for variable ${key}`);
            return;
        }

        valueStr = this.updateConfiguredValue(valueStr, key);

        const line = this.lines[index];
        this.lines[index] = line.replace(/=.*/, `= ${valueStr}`);
    }

    private static findVarLineIndex(name: string): number {
        const key = Config.getKeyFromName(name);
        return this.lines.findIndex(line => line.trim().includes(key) && !line.trim().startsWith('#'));
    }

    private static convertValueToString(value: ScriptVar, index: number): string | null {
        const valueMap: { [key in typeof value]: string } = {
            'number': value?.toString(),
            'string': this.handleStringValue(String(value), index),
            'boolean': value ? 'True' : 'False'
        };

        return valueMap[typeof value];
    }

    private static handleStringValue(value: string, index: number): string {
        const oldLine = this.lines[index];
        if (oldLine.includes('"""') || oldLine.includes('\'\'\'')) {
            const startIndex = index + 1;
            const endIndex = this.lines.findIndex((line, i) => i >= startIndex && (
                line.includes('"""') || line.includes('\'\'\'')
            )) + 1;
            this.lines.splice(startIndex, endIndex - startIndex);
        }
        
        return value;
    }

    private static updateConfiguredValue(valueStr: string, key: string): string {
        const conf = Config.getConfigFromName(key);
        if (conf.unwrap) {
            return `${conf.prefix}${valueStr}${conf.suffix}`;
        } else if (conf.type === 'string') {
            return `"${valueStr}"`;
        }
        return valueStr;
    }
}