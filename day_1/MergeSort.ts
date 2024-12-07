export function mergeSort(arr: Array<number>): Array<number> {

    let out: Array<number> = [];

    if (arr.length == 1) {
        out = arr;
    
    } else {

        const midPoint = Math.floor(arr.length / 2);

        const left = arr.slice(0, midPoint);
        const right = arr.slice(midPoint);

        const leftSorted = mergeSort(left);
        const rightSorted = mergeSort(right);

        out = zipper(leftSorted, rightSorted);

    }

    return out
}


function zipper(a: Array<number>, b: Array<number>): Array<number> {

    const out: Array<number> = [];

    const aL = a.length;
    const bL = b.length;

    let aIdx = 0;
    let bIdx = 0;

    while (true) {

        const aIdxInBounds = aIdx < aL;
        const bIdxInBounds = bIdx < bL;

        if (aIdxInBounds && bIdxInBounds) {

            if (a[aIdx] <= b[bIdx]) {
                out.push(a[aIdx++]);

            } else {
                out.push(b[bIdx++]);
            }
        
        } else if (aIdxInBounds) {
            out.push(a[aIdx++]);
        
        } else if (bIdxInBounds) {
            out.push(b[bIdx++]);

        } else {
            break;
        }

    }

    return out;
}