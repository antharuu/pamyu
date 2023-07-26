export default interface IVariable {
  variables: {
    name: string;
    value: unknown;
    type: "string" | "number" | "boolean";
  };

  get(name: string): unknown;

  set(name: string, value: unknown): IVariable;

  add(name: string, value: unknown): IVariable;

  remove(name: string, value: unknown): IVariable;

  increment(name: string): IVariable;

  decrement(name: string): IVariable;

  toggle(name: string): IVariable;

  reset(name: string): IVariable;
}
