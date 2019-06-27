const { poolPromise } = require('./pool');

module.exports = {
getTeamByTournamentId: async function (tournamentId, callback, res){
    const pool = await poolPromise;
    pool.request()
    .input('tournamentIdParameter', tournamentId)
    .query('SELECT nombre, puntos from dbo.equipos e INNER JOIN dbo.torneos t ON e.id=t.equipo WHERE t.Id=@tournamentIdParameter ORDER BY puntos DESC')
    .then(result => {
        var toArray = [];
        result.recordset.forEach(r => {
        toArray.push({  name:r.nombre, points: r.puntos });
    })
    callback(null, toArray, tournamentId, res)
        }).catch(function(err) {
        callback(err, null, null, res);
        });
    } 
}