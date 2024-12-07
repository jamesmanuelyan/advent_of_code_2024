import { mergeSort } from "./MergeSort";
import { readInputData } from "./ReadInputData";
import { DataSource, InputData, Results } from "./Types";


async function main() {

    if (process.argv.length == 3) {

        if (!['example', 'puzzle'].includes(process.argv[2])) {
            throw new Error('Expecting "example" or "puzzle".');
        }

        const ds: DataSource = process.argv[2] == 'example' ? 'example' : 'puzzle';
        const inputData = await readInputData(ds);

        const results = compute(inputData);
        displayResults(results);

    } else {
        throw new Error('Expecting 1 input argument');
    }
}


function compute(inputData: InputData): Results {

    const leftSorted = mergeSort(inputData.left);
    const rightSorted = mergeSort(inputData.right);

    const distance = leftSorted.reduce((acc,curr,i) => acc + Math.abs(rightSorted[i] - curr), 0);
    
    let frequency = { };

    rightSorted.forEach((el,i,arr) => {
        const prevEl: number | null = i > 0 ? arr[i-1] : null;

        if (el != prevEl) {
            frequency[el] = 1;
        } else {
            frequency[el]++;
        }
    });

    let similarity = leftSorted.reduce((acc,curr) => curr in frequency ? acc + curr * frequency[curr] : acc, 0);

    return { distance: distance, similarity: similarity };
}


function displayResults(results: Results) {
    console.log('\n- Historian Hysteria ----------------------------------------');
    console.log('Distance: ', results.distance);
    console.log('Similarity: ', results.similarity);
    console.log('-------------------------------------------------------------\n');
}


main();