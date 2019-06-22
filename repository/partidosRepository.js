const { poolPromise } = require('./pool');
var { update, getTeamByTournamentId } = require('../repository/torneosRepository');
module.exports = {
    alreadyLoaded: async function (match, tournamentId, callback, res){
        const pool = await poolPromise;
        pool.request()
            .input('idParameter', id)
            .query('SELECT count(*) AS value FROM dbo.partidos WHERE id=@idParameter')
            .then(result => {
                if(result.recordset[0].value > 0){
                    console.log("Match already present on database.")
                }else{
                    callback(match, tournamentId, update, res)
                }
            }).catch(function(err) {
                console.log(err.message)
            });
    },
    insertMatch: async function(match, tournamentId, callback, res) {
        const pool = await poolPromise;
        pool.request()
            .input('idParameter', match.id)
            .query('INSERT INTO dbo.partidos (id) VALUES (@idParameter)')
            .then(result => {
                if(match.result == -1)
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
    } 
}