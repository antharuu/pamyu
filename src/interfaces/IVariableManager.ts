export type VariableType = string | number | boolean;
export type VariableTypeString = "string" | "number" | "boolean";

export interface Variable {
    name: string;
    type: VariableTypeString;
    value: VariableType;
}

export interface IVariableManager {
    variables: Map<string, Variable>;

    getVariable(name: string): Variable['value'];

    getVariableType(name: string): VariableTypeString;

    setVariable(name: string, value: VariableType): IVariableManager;

    setNewString(name: string, value?: string): IVariableManager;

    setNewNumber(name: string, value?: number): IVariableManager;

    setNewBoolean(name: string, value?: boolean): IVariableManager;

    toggleBoolean(name: string): IVariableManager;

    reset(name: string): IVariableManager;
}