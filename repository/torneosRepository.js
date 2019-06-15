const { poolPromise } = require('./pool');

module.exports = {
    create: async function (teams, tournamentId) {
        const pool = await poolPromise;
        teams.forEach(team => {
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
    update: async function (teams, tournamentId) {
        const pool = await poolPromise;
        teams.forEach(team => {
            await pool.request()
                .input('teamIdParameter', team.id)
                .input('pointsParameter', team.points)
                .input('tournamentParameter', tournamentId)
                .query('UPDATE dbo.torneos SET puntos=@pointsParameter WHERE id=@tournamentParameter AND equipo=@teamIdParameter')
                .then(result => {
                    console.log(result);
                    if(result.rowsAffected == 1){
                        console.log('Values updated for team' + team.name + 'in tournament: ' + tournamentId)
                    }
                })
                .catch(function(err) {
                    console.log(err.message);
                });
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
    }
}