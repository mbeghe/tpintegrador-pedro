var reporting = require('./reporting');
const fs = require('fs');
var commonFunctions = require('../shared/commonFunctions');
var { insertMatch } = require('../repository/partidosRepository');

module.exports = {
    createReport: function(err, teamsArray, tournamentId, res) {
      var assetsPath = './assets/ranking' + tournamentId + '.txt';
      var n = teamsArray.length;
      var equipoValues = [];
      fs.writeFileSync(assetsPath, 'Tabla de posiciones' + '\r\n')
      fs.appendFileSync(assetsPath, '--------------------------' + '\r\n')
      for(var i =0; i<n; i++)
      {
        var equipo = commonFunctions.formatear (teamsArray, i+1 );
        fs.appendFileSync(assetsPath, equipo.name + ': ' + equipo.puntos + '\r\n');
      }
  },
  processMatches: function(err, payload, callback, res) {
    if(err){
      callback(err)
    }

    payload.matches.forEach(p => {
      
      callback(p, payload.tournamentId, insertMatch, res)
    });

    reporting.updateorCreateReport(payload.tournamentId);
  },
}


