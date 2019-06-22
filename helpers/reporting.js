const fs = require('fs');
const assetsPath = '../assets/';
const torneosRepository = require('../repository/torneosRepository');

module.exports = {
    updateorCreateReport: function(tournamentId){
       try
       {
           var content = torneosRepository.getOrderedById(tournamentId);
           fs.writeFileSync(assetsPath + 'tournament' + tournamentId, content);
       }
       catch(error)
       {
           console.log(error.message);
       }
    }
}