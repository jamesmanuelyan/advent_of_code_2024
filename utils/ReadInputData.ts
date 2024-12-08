import { DataSource, InputDataRows } from "./UtilTypes";
import { promises as fs } from "fs";


/**
 * readInputData
 * ----------------------------------------------------------------
 * Read the puzzle input data.
 * ----------------------------------------------------------------
 * @param dataDir: Absolute path to the input data directory; The 
 *                 directory is expected to contain two .txt files: 
 *                 "example.txt" and "puzzle.txt".
 * 
 * @param ds:      Data source: "example" or "puzzle"
 */
export async function readInputData(dataDir: string, ds: DataSource): Promise<InputDataRows> {

    const fileName = ds == 'example' ? 'example.txt' : 'puzzle.txt';
    const absPath = dataDir + "/" + fileName;

    const rawData = await fs.readFile(absPath, "utf8");

    return rawData.split('\n');
}