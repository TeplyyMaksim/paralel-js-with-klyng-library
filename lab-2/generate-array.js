module.exports = function generateRandomData(size) {
  var min = -20, max = 20;
  var list = new Array(size);
  for(var i = 0; i < size; ++i) {
    list[i] = Math.random() * (max - min) + min;
  }

  return list;
}
