const { poolPromise } = require('./pool');

module.exports = {
    alreadyLoaded: function (id) {
        const pool = await poolPromise;
        return await pool.request()
                        .input('idParameter', id)
                        .query('SELECT count(*) FROM dbo.partidos WHERE id=@idParameter')
                        .then(result => {
                                result > 0
                        }).catch(function(err) {
                            console.log(err.message);
                        }); 
    },
    insertMatch: function(id) {
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