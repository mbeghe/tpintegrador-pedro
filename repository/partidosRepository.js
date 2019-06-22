const { poolPromise, sqlrqst } = require('./pool');

module.exports = {
    alreadyLoaded: async function (id) {
        const pool = await poolPromise;
        return pool.request()
                        .input('idParameter', id)
                        .query('SELECT count(*) AS value FROM dbo.partidos WHERE id=@idParameter')
                        .then(result => {
                            console.log(result.recordset[0].value)
                            result.recordset[0].value > 0
                        }).catch(function(err) {
                            console.log(err.message);
                        }); 
    },
    insertMatch: async function(id) {
        const pool = await poolPromise;
        await pool.request()
                    .input('idParameter', id)
                    .query('INSERT INTO dbo.partidos (id) VALUES (@idParameter)')
                    .then(result => {
                            console.log(result);
                    }).catch(function(err) {
                        console.log(err.message);
                    }); 
    } 
}