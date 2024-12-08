import { DataSource, InputDataRows } from "./UtilTypes";
import { promises as fs } from "fs";


export async function readInputData(dataDir: string, ds: DataSource): Promise<InputDataRows> {

    const fileName = ds == 'example' ? 'example.txt' : 'puzzle.txt';
    const absPath = dataDir + "/" + fileName;

    const rawData = await fs.readFile(absPath, "utf8");

    return rawData.split('\n');
}