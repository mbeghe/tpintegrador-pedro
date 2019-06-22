const { poolPromise } = require('./pool');
var { writeFixtureToFileSystem } = require('../helpers/fixtureManager');
var { createReport } = require('../helpers/partidos');
var { convertToObjArray } = require('../shared/commonFunctions');

module.exports = {
    create: async function (teams, tournamentId) {
        const pool = await poolPromise;
        teams.forEach(async function(team){ 
            await pool.request()
                .input('nameParameter', team.name)
                .input('pointsParameter', team.name)
                .input('tournamentParameter', tournamentId)
                .query('INSERT INTO dbo.torneos (id, equipo, puntos) VALUES (@tournamentParameter, @nameParameter, @pointsParameter)')
                .then(result => {
                        console.log(result);
                }).catch(function(err) {
                    console.log(err.message);
                });
        });
        
    },
    update: async function (teamId, tournamentId, points, callback, res) {
        const pool = await poolPromise;
        pool.request()
            .input('teamIdParameter', teamId)
            .input('pointsParameter', points)
            .input('tournamentParameter', tournamentId)
            .query('UPDATE dbo.torneos SET puntos=@pointsParameter WHERE id=@tournamentParameter AND equipo=@teamIdParameter')
            .then(result => {
                callback(tournamentId, createReport)
            })
            .catch(function(err) {
                console.log(err.message);
            });
    },
    delete: async function (teamId, tournamentId) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('teamIdParameter', teamId)
                        .input('tournamentIdParameter', tournamentId)
                        .query('DELETE FROM dbo.torneos WHERE id=@tournamentId AND equipo=@teamIdParameter')
                        .then(result => {
                                console.log(result);
                                if(result.rowsAffected == 0){
                                    console.log('No records found for team' + teamId + 'on tournament' + tournamentId)
                                }
                        }).catch(function(err) {
                            console.log(err.message);
                        });
    },
    getOrderedById: async function(tournamentId) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('tournamentIdParameter', tournamentId)
                        .query('SELECT * FROM dbo.torneos WHERE id=@tournamentIdParameter ORDER BY puntos DESC')
                        .then(result => {
                            console.log(result);
                        }).catch(function(err) {
                            console.log(err.message);
                        });
    },
    getTeamByTournamentId: async function (tournamentId, callback, res){
        const pool = await poolPromise;
        await pool.request()
                        .input('tournamentIdParameter', tournamentId)
                        .query('SELECT nombre from dbo.equipos e INNER JOIN dbo.torneos t ON e.id=t.equipo WHERE t.Id=@tournamentIdParameter')
                        .then(result => {
                            var toArray = [];
                            result.recordset.forEach(r => {
                                toArray.push(r.nombre)
                            })

                            writeFixtureToFileSystem(null, toArray, tournamentId, res)
                        }).catch(function(err) {
                            writeFixtureToFileSystem(err, null, null, res);
                        });
      }
}