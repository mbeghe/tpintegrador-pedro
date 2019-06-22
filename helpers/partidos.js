const tablaPath = '../../tabladeposiciones/tabladeposiciones.txt';
const tablaValues = '../../tabladeposiciones/tablavalues.json';
const partidosPath = '../../../T3/partidos/';
const fs = require('fs');
const puntajeInicial = 0;
var commonFunctions = require('../shared/commonFunctions');
var partidosRepository = require('../repository/partidosRepository');


module.exports = {
    createReport: function(teams) {
      var teamsArray = commonFunctions.convertToObjArray(teams);
      var n = teamsArray.length;
      var equipoValues = [];
      fs.writeFileSync(tablaPath, 'Tabla de posiciones' + '\r\n')
      fs.appendFileSync(tablaPath, '--------------------------' + '\r\n')
      fs.writeFileSync(tablaValues,'');
      for(var i =0; i<n; i++)
      {
        var equipo = commonFunctions.formatear (teamsArray, i+1 );
        equipoValues.push([{name: equipo, puntos: puntajeInicial}]);
        fs.appendFileSync(tablaPath, equipo + ': ' + puntajeInicial + '\r\n');
        
      }
  },
  processMatches: function(matches) {
    matches.forEach(p => {
      if(partidosRepository.alreadyLoaded(p.Id))
      {
        console.log("el partido ya fue cargado");

        return;
      }
      partiidosRepository.insertMatch(p.Id);
    })
  }
}
