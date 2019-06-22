const { poolPromise } = require('./pool');

module.exports = {
    alreadyLoaded: async function (id){
        const pool = await poolPromise;
        return await pool.request()
                        .input('idParameter', id)
                        .query('SELECT count(*) AS value FROM dbo.partidos WHERE id=@idParameter')
                        .then(function(resolve, err) {
                            return resolve.recordset;
                        }).catch(function(err) {
                            console.log(err.message)
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