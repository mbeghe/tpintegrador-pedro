const { poolPromise } = require('./pool');

module.exports = {
    create: async function(name) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('nameParameter', name)
                        .query('INSERT INTO dbo.jugador (nombre) VALUES(@nameParameter)')
                        .then(result => {
                                console.log(result);
                        }).catch(function(err) {
                            console.log(err.message);
                        });
    },
    update: async function(name, equipo) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('nameParameter', name)
                        .input('teamParameter', equipo)
                        .query('UPDATE dbo.jugador SET equipo=@teamparameter WHERE nombre=@nameParameter')
                        .then(result => {
                                console.log(result);
                                if(result.rowsAffected == 1){
                                    console.log('Values updated for player', name)
                                }
                        }).catch(function(err) {
                            console.log(err.message);
                        });
    },
    delete: async function(name) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('nameParameter', name)
                        .query('DELETE FROM dbo.jugador WHERE nombre=@nameParameter')
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