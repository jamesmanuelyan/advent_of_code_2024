import { readInputData } from "../utils/ReadInputData"
import { DataSource, InputDataRows } from "../utils/UtilTypes";
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

    return {
        numSafeReports: inputData.filter(isThisReportSafe).length,
        numSafeReportsWithProblemDampener: 0,
    }
}


function isThisReportSafe(report: Array<number>): boolean {

    let out = false;

    const MIN_RATE = 1
    const MAX_RATE = 3

    const dReport = arrayDerivative(report);

    const gradientDirSum = dReport.reduce((acc,el) => acc+Math.sign(el), 0);

    const isStrictlyMonotonic = Math.abs(gradientDirSum) == dReport.length;

    if (isStrictlyMonotonic) {

        const absEdgeGradients = [Math.min(...dReport), Math.max(...dReport)].map(Math.abs);

        const isWithinGradientLimits = (Math.min(...absEdgeGradients) >= MIN_RATE) && (Math.max(...absEdgeGradients)) <= MAX_RATE;

        if (isWithinGradientLimits) {
            out = true;
        }
    }

    return out;
}


function arrayDerivative(a: Array<number>): Array<number> {

    return a.slice(1).map((el,i) => el - a[i]);
}


function displayResults(results: Results) {
    console.log('\n- Red Nosed Reports -----------------------------------------');
    console.log('Number of safe reports: ', results.numSafeReports);
    console.log('Number of safe reports (with the problem dampener): ', '** To Be Implemented **');
    console.log('-------------------------------------------------------------\n');
}


function processInputData(rawData: InputDataRows): ProcessedInputData {

    return rawData.map( strRow => strRow.split(' ').map(el => parseInt(el)) );
}


main();