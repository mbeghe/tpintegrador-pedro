const { poolPromise } = require('./pool');
var { update } = require('../repository/torneosRepository');
module.exports = {
    alreadyLoaded: async function (match, tournamentId, callback, res){
        const pool = await poolPromise;
        pool.request()
            .input('idParameter', match.id)
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
    }
}