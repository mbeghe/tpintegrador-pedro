var torneosRepository = require('../repository/torneosRepository');

module.exports = {
  convertToObjArray: function(array) {
    var equiposArray = [];
    for(var i =1; i<=array.length; i++) {
      equiposArray.push({id:i, name:array[i-1]});
    }

    return equiposArray;
  },
  formatear: function (equiposArray, x) {
    var doubleX = +x;
    if (x < 10) return buscarEquipo( doubleX, equiposArray); return buscarEquipo(x, equiposArray);
  },
  arrayLoader(array,items){
    array.push(items);
  }
}

function buscarEquipo(key, myArray) {
  for (var i=0; i < myArray.length; i++) {
    if (myArray[i].id === key) {
        return myArray[i].name;
    }
  }
}