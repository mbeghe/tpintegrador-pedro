var torneosRepository = require('../repository/torneosRepository');

module.exports = {
  convertToObjArray: function(array) {
    var equiposArray = [];
    for(var i =1; i<=array.length; i++) {
      equiposArray.push({id:i, name:array[i-1].name, points: array[i-1].points });
    }

    return equiposArray;
  },
  formatear: function (equiposArray, x) {
    var doubleX = +x;
    if (x < 10) return buscarEquipo( doubleX, equiposArray); return buscarEquipo(x, equiposArray);
  },
  arrayLoader(array,items){
    array.push(items);
  },
  formatearTabla: function (equiposArray, x){
    var doubleX = +x;
    if (x < 10) return armarTabla( doubleX, equiposArray); return armarTabla(x, equiposArray);
  }
}

function buscarEquipo(key, myArray) {
  for (var i=0; i < myArray.length; i++) {
    if (myArray[i].id === key) {
        return myArray[i].name;
    }
  }
}

function armarTabla(key, myArray){
  for (var i=0; i < myArray.length; i++) {
    if (myArray[i].id === key) {
        return {name: myArray[i].name, points: myArray[i].points};
    }
  }
}