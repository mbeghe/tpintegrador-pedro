const fs = require('fs');
var commonFunctions = require('../shared/commonFunctions');
const { createReport } = require('../helpers/partidos');
const matchesArray = [];

module.exports = {
  generateFixture: function (err, tournmanentId, callback, res) {
    if(err){
      console.log(err);
      return;
    }

    if(tournmanentId == null){

      res.send(callback)
    }
    
    callback(tournmanentId, writeFixtureToFileSystem, res)
  },
  writeFixtureToFileSystem: function(err, teams, tournamentId, res){
    if(err){
      res.status(500).send(err.message)
    }

    var teamsArray = commonFunctions.convertToObjArray(teams);
    var n = teamsArray.length;
    var matches = n-1;
    var assetsPath = './assets/tournament' + tournamentId + '.txt';

    fs.writeFileSync(assetsPath, 'FIXTURE' + '\r\n')
    fs.appendFileSync(assetsPath, '--------------------------' + '\r\n')
    
    for (var r=1; r<n; r++) {
      fs.appendFileSync(assetsPath, '--------------------------' + '\r\n')
      fs.appendFileSync(assetsPath, 'Fecha ' + r + '\r\n')
      fs.appendFileSync(assetsPath, '--------------------------' + '\r\n')
      for (i=1; i <= n/2; i++) {
        if (i==1) {
          var team1 = commonFunctions.formatear (teamsArray, 1);
          var team2 = commonFunctions.formatear (teamsArray, (matches+r-1) % (matches) + 2);
          fs.appendFileSync(assetsPath, team1 + ' VS ' + team2 + '\r\n')
          commonFunctions.arrayLoader(matchesArray,(team1+'vs'+team2))
        } else {
          var team1 = commonFunctions.formatear (teamsArray, (r+i-2) % (matches) + 2 );
          var team2 = commonFunctions.formatear (teamsArray, (matches+r-i) % (matches) + 2);
          fs.appendFileSync(assetsPath, team1 + ' VS ' + team2 + '\r\n')
          commonFunctions.arrayLoader(matchesArray,(team1+'vs'+team2))
        }
      }
    }

    createReport(teamsArray, tournamentId);
    res.status(200).send({message: "Fixture created on path: " + assetsPath});
  }
}