var klyng = require('klyng');

function main() {
    var size = klyng.size();
    var rank = klyng.rank();

    console.log("Process with rang %d executing total number of processes - %d", rank, size);

    klyng.end();
}

klyng.init(main);
