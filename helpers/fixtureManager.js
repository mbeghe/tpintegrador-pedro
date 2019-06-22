const fs = require('fs');
var commonFunctions = require('../shared/commonFunctions');
var matchesManager = require('../helpers/partidos');
const fixturePath = '../../../T3/fixtures/fixture.json';
const matchesArray = [];

module.exports = {
    generateFixture: function (tournmanentId) {
    var teams = commonFunctions.getTeamByTournamentId(tournmanentId);
    var teamsArray = commonFunctions.convertToObjArray(teams);
    var n = teamsArray.length;
    //var fechas = [];
    var matches = n-1;
    try{
    fs.writeFileSync(fixturePath, 'FIXTURE' + '\r\n')
    fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
    for (var r=1; r<n; r++) {
      fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
      fs.appendFileSync(fixturePath, 'Fecha' + r + '\r\n')
      fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
        for (i=1; i <= n/2; i++) {
          if (i==1)
          {
          var team1 = commonFunctions.formatear (teamsArray, 1 );
          var team2 = commonFunctions.formatear (teamsArray, (matches+r-1) % (matches) + 2);
          fs.appendFileSync(fixturePath, team1 + ' VS ' + team2 + '\r\n')
          commonFunctions.arrayLoader(matchesArray,(team1+'vs'+team2))
        }
          else
          {
          var team1 = commonFunctions.formatear (teamsArray, (r+i-2) % (matches) + 2 );
          var team2 = commonFunctions.formatear (teamsArray, (matches+r-i) % (matches) + 2);
          fs.appendFileSync(fixturePath, team1 + ' VS ' + team2 + '\r\n')
          commonFunctions.arrayLoader(matchesArray,(team1+'vs'+team2))
          }
        }
      }
    }catch(error)
    {
      console.log(error.message);
    }
      try{
        matchesManager.loadMatches(matchesArray);
        console.log("matches cargados correctamente");
      }catch(error){
        console.log(error.message);
      }
    }
  }