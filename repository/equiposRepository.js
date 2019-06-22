const { poolPromise } = require('./pool');

module.exports = {
    create: async function (team) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('nameParameter', team.name)
                        .input('idParameter', team.id)
                        .query('INSERT INTO dbo.equipos (id, nombre) VALUES (@idParameter, @nameParameter)')
                        .then(result => {
                                console.log(result);
                        }).catch(function(err) {
                            console.log(err.message);
                        });
    },
    update: async function(name, id) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('nameParameter', name)
                        .input('idParameter', id)
                        .query('UPDATE dbo.equipos SET nombre=@nameParameter WHERE id=@idParameter')
                        .then(result => {
                                console.log(result);
                                if(result.rowsAffected == 1){
                                    console.log('Values updated for team', name)
                                }
                        }).catch(function(err) {
                            console.log(err.message);
                        });
    },
    delete: async function(id) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('idParameter', name)
                        .query('DELETE FROM dbo.jugador WHERE id=@idParameter')
                        .then(result => {
                                console.log(result);
                                if(result.rowsAffected == 0){
                                    console.log('No records found for', name)
                                }
                        }).catch(function(err) {
                            console.log(err.message);
                        });
    }
}