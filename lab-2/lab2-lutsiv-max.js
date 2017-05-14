var klyng = require('klyng');
var createArray = require('./generate-array');

var ARRAY1SIZE = 10;
var ARRAY2SIZE = 15;

function main() {

  var size = klyng.size();
  var rank = klyng.rank();
  var rootRank = 0
  var firstRank = 1;
  var secondRank = 2;

  if(rank === rootRank) {
    var list1 = createArray(ARRAY1SIZE);
    var list2 = createArray(ARRAY2SIZE);

    // Sending to positive process
    klyng.send({
      to: firstRank,
      data: {
        numbers: list1,
        way: firstRank
      }
    });
    // Sending to negative process
    klyng.send({
      to: secondRank,
      data: {
        numbers: list2,
        way: secondRank
      }
    });

    console.log(`Найбільше значення ${klyng.recv({ from: firstRank }) >= klyng.recv({ from: secondRank }) ? 'першого' : "другого"} масиву є більшим`);
  }
  else {
    var request = klyng.recv({ from: rootRank });
    var result = Math.max(...request.numbers);
    console.log(`В ${request.way === firstRank ? 'першому' : 'другому'} масиві найбільшим значенням є ${result}`);
    klyng.send({ to: rootRank, data: result })
  }
  klyng.end();
}

klyng.init(main);
