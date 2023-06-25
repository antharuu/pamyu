import {IVariableManager, Variable, VariableType, VariableTypeString} from "../interfaces/IVariableManager";

export class VariableManager implements IVariableManager {
    variables: Map<string, Variable> = new Map<string, Variable>();

    getVariable(name: string): Variable["value"] {
        if (!this.variables.has(name)) {
            console.warn(`Variable ${name} does not exist!`);
            return "";
        }

        return this.variables.get(name)?.value as Variable["value"];
    }

    getVariableType(name: string): VariableTypeString {
        if (!this.variables.has(name)) {
            console.warn(`Variable ${name} does not exist!`);
            return "string";
        }

        return this.variables.get(name)?.type as VariableTypeString;
    }

    reset(name: string): IVariableManager {
        if (!this.variables.has(name)) {
            console.warn(`Variable ${name} does not exist!`);
            return this;
        }

        const variable = this.variables.get(name) as Variable;

        switch (variable.type) {
            case "string":
                variable.value = "";
                break;
            case "number":
                variable.value = 0;
                break;
            case "boolean":
                variable.value = false;
                break;
        }

        return this;
    }

    setNewBoolean(name: string, value?: boolean): IVariableManager {
        if (this.variables.has(name)) {
            console.warn(`Variable ${name} already exists!`);
            return this;
        }

        this.variables.set(name, {
            name,
            type: "boolean",
            value: value || false,
        });

        return this;
    }

    setNewNumber(name: string, value?: number): IVariableManager {
        if (this.variables.has(name)) {
            console.warn(`Variable ${name} already exists!`);
            return this;
        }

        this.variables.set(name, {
            name,
            type: "number",
            value: value || 0,
        });

        return this;
    }

    setNewString(name: string, value?: string): IVariableManager {
        if (this.variables.has(name)) {
            console.warn(`Variable ${name} already exists!`);
            return this;
        }

        this.variables.set(name, {
            name,
            type: "string",
            value: value || "",
        });

        return this;
    }

    setVariable(name: string, value: VariableType): IVariableManager {
        if (!this.variables.has(name)) {
            console.warn(`Variable ${name} does not exist!`);
            return this;
        }

        const variable = this.variables.get(name) as Variable;

        switch (variable.type) {
            case "string":
                variable.value = value as string;
                break;
            case "number":
                variable.value = value as number;
                break;
            case "boolean":
                variable.value = value as boolean;
                break;
        }

        return this;
    }

    toggleBoolean(name: string): IVariableManager {
        if (!this.variables.has(name)) {
            console.warn(`Variable ${name} does not exist!`);
            return this;
        }

        const variable = this.variables.get(name) as Variable;

        if (variable.type !== "boolean") {
            console.warn(`Variable ${name} is not a boolean!`);
            return this;
        }

        variable.value = !variable.value;

        return this;
    }

}