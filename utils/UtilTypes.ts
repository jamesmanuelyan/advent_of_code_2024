export type DataSource = "example" | "puzzle";
export type InputDataRows = Array<string>;

export interface Dictionary<T> {
    [key: string]: T;
}