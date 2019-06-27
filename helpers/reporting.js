const fs = require('fs');
const assetsPath = '../assets/';
const torneosRepository = require('../repository/torneosRepository');

module.exports = {
    updateorCreateReport: function(tournamentId){
    var assetsPath = './assets/ranking' + tournamentId + '.txt';
       try
       {
           var content = torneosRepository.getTeamByTournamentId(tournamentId);
           var equipoValues = commonFunctions.convertToObjArray(content);
           var n = equipoValues.length;
           fs.writeFileSync(assetsPath, 'Tabla de posiciones' + '\r\n')
           fs.appendFileSync(assetsPath, '--------------------------' + '\r\n')
           for(var i =0; i<n; i++)
           {
             var equipo = commonFunctions.formatearTabla (equipoValues, i+1 );
             console.log(equipo);
             fs.appendFileSync(assetsPath, equipo.name + ': ' + equipo.points + '\r\n');
           }
       }
       catch(error)
       {
           console.log(error.message);
       }
    }
}


// var n = teamsArray.length;
//       var equipoValues = commonFunctions.convertToObjArray(teamsArray);
//       fs.writeFileSync(assetsPath, 'Tabla de posiciones' + '\r\n')
//       fs.appendFileSync(assetsPath, '--------------------------' + '\r\n')
//       for(var i =0; i<n; i++)
//       {
//         var equipo = commonFunctions.formatearTabla (equipoValues, i+1 );
//         console.log(equipo);
//         fs.appendFileSync(assetsPath, equipo.name + ': ' + equipo.points + '\r\n');
//       }