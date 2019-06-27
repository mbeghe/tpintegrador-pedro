const { poolPromise } = require('./pool');
var {getTeamByTournamentId} = require('./torneosGetRepository');


module.exports = {
    insertMatch: async function(match, tournamentId, callback, res) {
        const pool = await poolPromise;
        pool.request()
            .input('idParameter', match.id)
            .query('INSERT INTO dbo.partidos (id) VALUES (@idParameter)')
            .then(result => {
                if(match.team1 != match.result && match.team2 != result && match.result != -1)
                {
                    console.log("Invalid Match result");
                }
                else if(match.result == -1)
                {
                    callback(match.team1, tournamentId, 1, getTeamByTournamentId, res);
                    callback(match.team2, tournamentId, 1, getTeamByTournamentId, res);
                }
                else
                {
                    callback(match.result, tournamentId, 3, getTeamByTournamentId, res);
                }
            }).catch(function(err) {
                console.log(err.message);
            }); 
    },
   
}