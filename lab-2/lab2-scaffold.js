var klyng = require('klyng');
var gen = require('./generate-array');

var ARRAYSIZE = 15;

// This is the entry function
function main() {

    var size = klyng.size();
    var rank = klyng.rank();

    if(rank === 0) {
        var list = gen(ARRAYSIZE);
        var portionSize = Math.floor(ARRAYSIZE / size);

        for(var p = 1; p < size; ++p) {
            var portion = list.slice((p - 1) * portionSize, p * portionSize);

            klyng.send({to: p, data: portion});
        }

        var rootPortion = list.slice((size - 1) * portionSize, ARRAYSIZE);

        var localSum = rootPortion.reduce((prev, next) => prev + next);

        // here the root will wait for other processes partial sums
        for(var p = 1; p < size; ++p) {
            // it doesn't matter from where the partial sum is coming
            // we'll collect them all anyway, so no need to pass criteria
            var partialSum = klyng.recv();
            localSum += partialSum;
        }

        // report back the total sum to the user
        console.log("The Total Sum is %d", localSum);
    }
    else {
        var portion = klyng.recv({from: 0});
        var partialSum = portion.reduce((prev, next) => prev + next);

        // report back the partial sum to the root process
        klyng.send({to:0 , data: partialSum});
    }

    klyng.end();
}

klyng.init(main);
