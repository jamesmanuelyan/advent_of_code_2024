import { mergeSort } from "../utils/MergeSort";
import { readInputData } from "../utils/ReadInputData"
import { DataSource, InputDataRows, Dictionary } from "../utils/UtilTypes";
import { ProcessedInputData, Results } from "./Types";


async function main() {

    if (process.argv.length == 3) {

        if (!['example', 'puzzle'].includes(process.argv[2])) {
            throw new Error('Expecting "example" or "puzzle".');
        }

        const ds: DataSource = process.argv[2] == 'example' ? 'example' : 'puzzle';
        const dataDir = __dirname + "/../../data";
        const rawData = await readInputData(dataDir, ds);
        const processedData = processInputData(rawData);

        const results = compute(processedData);
        displayResults(results);

    } else {
        throw new Error('Expecting 1 input argument');
    }
}


function compute(inputData: ProcessedInputData): Results {

    const leftSorted = mergeSort(inputData.left);
    const rightSorted = mergeSort(inputData.right);

    const rightListElementFrequencies = elementFrequenciesOfAscendingSortedList(rightSorted);

    return calculateDistanceAndSimilarity(leftSorted, rightSorted, rightListElementFrequencies);
}


function displayResults(results: Results) {
    console.log('\n- Historian Hysteria ----------------------------------------');
    console.log('Distance: ', results.distance);
    console.log('Similarity: ', results.similarity);
    console.log('-------------------------------------------------------------\n');
}


function processInputData(rawData: InputDataRows): ProcessedInputData {

    const out = { left: [], right: [] };

    rawData.forEach(strRow => {
        const cols = strRow.split(' ');
        out.left.push(parseInt(cols[0]));
        out.right.push(parseInt(cols[cols.length-1]));
    });

    return out;
}


function elementFrequenciesOfAscendingSortedList(sortedAsc: Array<number>): Dictionary<number> {

    const out = { };

    sortedAsc.forEach((el,i,arr) => {
        const prevEl: number | null = i > 0 ? arr[i-1] : null;

        if (el != prevEl) {
            out[el] = 1;
        } else {
            out[el]++;
        }
    });

    return out;
}


function calculateDistanceAndSimilarity(leftSorted: Array<number>, rightSorted: Array<number>, rightListElementFrequencies: Dictionary<number>): Results {

    return leftSorted.reduce((acc,curr,i) => {

        acc.distance += Math.abs(rightSorted[i] - curr);

        if (curr in rightListElementFrequencies) {
            acc.similarity += curr * rightListElementFrequencies[curr];
        }

        return acc;

    }, {distance: 0, similarity: 0});
}


main();