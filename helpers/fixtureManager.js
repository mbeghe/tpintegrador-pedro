const fs = require('fs');
var commonFunctions = require('../shared/commonFunctions');
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
    
    callback(tournmanentId, res)
  },
  writeFixtureToFileSystem: function(err, teams, tournamentId, res){
    if(err){
      res.status(500).send(err.message)
    }

    var teamsArray = commonFunctions.convertToObjArray(teams);
    var n = teamsArray.length;
    var matches = n-1;
    var fixturePath = './assets/tournament' + tournamentId + '.txt';

    fs.writeFileSync(fixturePath, 'FIXTURE' + '\r\n')
    fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
    
    for (var r=1; r<n; r++) {
      fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
      fs.appendFileSync(fixturePath, 'Fecha ' + r + '\r\n')
      fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
      for (i=1; i <= n/2; i++) {
        if (i==1) {
          var team1 = commonFunctions.formatear (teamsArray, 1);
          var team2 = commonFunctions.formatear (teamsArray, (matches+r-1) % (matches) + 2);
          fs.appendFileSync(fixturePath, team1 + ' VS ' + team2 + '\r\n')
          commonFunctions.arrayLoader(matchesArray,(team1+'vs'+team2))
        } else {
          var team1 = commonFunctions.formatear (teamsArray, (r+i-2) % (matches) + 2 );
          var team2 = commonFunctions.formatear (teamsArray, (matches+r-i) % (matches) + 2);
          fs.appendFileSync(fixturePath, team1 + ' VS ' + team2 + '\r\n')
          commonFunctions.arrayLoader(matchesArray,(team1+'vs'+team2))
        }
      }
    }

    res.status(200).send({message: "Fixture created on path: " + fixturePath});
  }
}