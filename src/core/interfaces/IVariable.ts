export interface IVariable {
    variables: {
        name: string;
        value: any;
        type: "string" | "number" | "boolean";
    }

    get(name: string): any;

    set(name: string, value: any): IVariable;

    add(name: string, value: any): IVariable;

    remove(name: string, value: any): IVariable;

    increment(name: string): IVariable;

    decrement(name: string): IVariable;

    toggle(name: string): IVariable;

    reset(name: string): IVariable;
}