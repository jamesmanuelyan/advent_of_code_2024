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

    const numSafeReports = inputData.reduce( (acc,report) => acc + (isThisReportSafe(report) ? 1 : 0), 0);

    return {
        numSafeReports: numSafeReports,
        numSafeReportsWithProblemDampener: 0,
    }
}


function isThisReportSafe(report: Array<number>): boolean {

    let out = false;

    const MIN_RATE = 1
    const MAX_RATE = 3

    const dReport = arrayDerivative(report);

    /**
     * Check that the report is either monotonically
     * increasing or decreasing.
     */
    const dReportMin = Math.min(...dReport);
    const dReportMax = Math.max(...dReport);
    const isMonotonic = Math.sign(dReportMin) == Math.sign(dReportMax);

    /**
     * Check that the rates of change are within the limits.
     */
    if (isMonotonic) {
        const absEdgeGradients = [dReportMin, dReportMax].map(el => Math.abs(el));

        const withinGradientLimits = (Math.min(...absEdgeGradients) >= MIN_RATE) && (Math.max(...absEdgeGradients)) <= MAX_RATE;

        if (withinGradientLimits) {
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

    const out = [];

    rawData.forEach(strRow => {
        const cols = strRow.split(' ');
        out.push( cols.map(el => parseInt(el)) );
    });

    return out;
}


main();