var klyng = require('klyng');

function main() {

  var size = klyng.size();
  var rank = klyng.rank();

  if(rank === 0) {

    for(var p = 1; p < size; ++p) {
      klyng.send({ to: p, data: p });
    }

    for(var p = 1; p < size; ++p) {
      klyng.recv();
    }
    console.log(`Разом з головним (0) виконалось ${size} процесів.`);
  }
  else {
    var processNum = klyng.recv({from: 0});

    console.log(`Процес №${processNum} виконався. Він є ${processNum % 2 === 0 ? 'Парний' : 'Непарний'}`);
    klyng.send({to:0 , data: 'Almost nothing'});
  }

  klyng.end();
}

klyng.init(main);
