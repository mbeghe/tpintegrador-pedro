var torneosRepository = require('../repository/torneosRepository');

module.exports = {
buscarEquipo: function(key, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === key) {
            return myArray[i].name;
        }
    }
},
  convertToObjArray: function(array) {
  var equiposArray = [];
  for(var i =1; i<=array.length; i++) {
    equiposArray.push({id:i, name:array[i-1]});
  }
  return equiposArray;
},

formatear: function (equiposArray, x) {
  var doubleX = +x;
  if (x < 10) return this.buscarEquipo( doubleX, equiposArray); else return this.buscarEquipo(x, equiposArray);
    },
    arrayLoader(array,items){
      array.push(items);
    },
    archivoValido: function(fileName,content){
      if(fileName.includes(content) || content == "empate"){
        return true;
      }
      else{
        return false;
      }
    },
    archivoLeido: function(fileName){
      if(fileName.includes("procesado")){
        return true;
      }
      else
      {
        return false;
      }
    },
    getTeamByTournamentId: function (tournamentId){
      return torneosRepository.getTeamsByTournamentId(tournamentId);
    }
}