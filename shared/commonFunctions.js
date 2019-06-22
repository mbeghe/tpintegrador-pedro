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
    if (x < 10) return  this.buscarEquipo( doubleX, equiposArray); return this.buscarEquipo(x, equiposArray);
  },
  buscarEquipo: function(key, myArray) {
    for (var i=0; i < myArray.length; i++) {
      if (myArray[i].id === key) {
          return myArray[i].name;
      }
    }
  },
  arrayLoader(array,items){
    array.push(items);
  }
}