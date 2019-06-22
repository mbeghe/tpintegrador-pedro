const tablaPath = '../../tabladeposiciones/tabladeposiciones.txt';
const tablaValues = '../../tabladeposiciones/tablavalues.json';
var reporting = require('./reporting');
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
  processMatches: function(payload) {
    payload.matches.forEach(p => {
      if(partidosRepository.alreadyLoaded(p.Id))
      {
        console.log("El partido ya fue cargado.");

        continue;
      }

      partidosRepository.insertMatch(p.Id);
      
      if(p.result == -1)
      {
        torneosRepository.update(payload.tournamentId,p.team1,1);
        torneosRepository.update(payload.tournamentId,p.team2,1);

        console.log("Empate registrado exitosamente.");
      }
      else
      {
        torneosRepository.update(payload.tournamentId,p.result,3);

        console.log("Equipo actualizado correctamente");
      }
    });

    reporting.updateorCreateReport(payload.tournamentId);
  },
}


