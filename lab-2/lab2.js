var klyng = require('klyng');
var gen = require('./generate-array');

var ARRAYSIZE = 15;

function main() {

  var size = klyng.size();
  var rank = klyng.rank();
  var rootRank = 0
  var positiveRank = 1;
  var negativeRank = 2;

  if(rank === rootRank) {
    var list = gen(ARRAYSIZE);

    // Sending to positive process
    klyng.send({
      to: positiveRank,
      data: {
        numbers: list,
        way: positiveRank
      }
    });
    // Sending to negative process
    klyng.send({
      to: negativeRank,
      data: {
        numbers: list,
        way: negativeRank
      }
    });

    console.log(`Абсолютна величина ${Math.abs(klyng.recv({ from: positiveRank })) <= Math.abs(klyng.recv({ from: negativeRank })) ? 'додатніх' : "від'ємних"} елементів менша`);
  }
  else {
    var request = klyng.recv({ from: rootRank });
    var result = request.numbers
      .filter(number => (request.way === positiveRank) ? (number >= 0) : (number <= 0))
      .reduce((prev, next) => prev * next);
    console.log(`Добуток ${request.way === positiveRank ? 'додатніх' : 'відємних'} значень масиву: ${result}`);
    klyng.send({ to: rootRank, data: result })
  }
  klyng.end();
}

klyng.init(main);
