import { DataSource, InputData } from "./Types";
import { promises as fs } from "fs";


export async function readInputData(ds: DataSource): Promise<InputData> {

    const out: InputData = { left: [], right: [] };
    const relPath = ds == 'example' ? '../data/example.txt' : '../data/puzzle.txt';
    const absPath = __dirname + "/" + relPath;

    const rawData = await fs.readFile(absPath, "utf8");

    rawData.split('\n').forEach(strRow => {
        const cols = strRow.split(' ');
        out.left.push(parseInt(cols[0]));
        out.right.push(parseInt(cols[cols.length-1]));
    });

    return out;
}