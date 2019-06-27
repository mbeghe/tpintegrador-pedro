const fs = require('fs');
var commonFunctions = require('../shared/commonFunctions');
var { insertMatch } = require('../repository/partidosUpdateRepository');

module.exports = {
    createReport: function(err, teamsArray, tournamentId, res) {
      var assetsPath = './assets/ranking' + tournamentId + '.txt';
      var n = teamsArray.length;
      var equipoValues = commonFunctions.convertToObjArray(teamsArray);
      fs.writeFileSync(assetsPath, 'Tabla de posiciones' + '\r\n')
      fs.appendFileSync(assetsPath, '--------------------------' + '\r\n')
      for(var i =0; i<n; i++)
      {
        var equipo = commonFunctions.formatearTabla (equipoValues, i+1 );
        console.log(equipo);
        fs.appendFileSync(assetsPath, equipo.name + ': ' + equipo.points + '\r\n');
      }
  },
  processMatches: function(err, payload, callback, res) {
    if(err){
      callback(err)
    }

    payload.matches.forEach(p => {
      
      callback(p, payload.tournamentId, insertMatch, res)
    });
  }
}


