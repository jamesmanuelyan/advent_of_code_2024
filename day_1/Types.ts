export type DataSource = "example" | "puzzle";

export interface InputData {
    left: Array<number>;
    right: Array<number>;
}

export interface Results {
    distance: number;
    similarity: number;
}