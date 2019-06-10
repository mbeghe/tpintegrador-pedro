const { poolPromise } = require('./pool');

module.exports = {
    create: async function(name) {
        try {
            const pool = await poolPromise;
        const result = await pool.request()
                                        .input('nameParameter', name)
                                        .query('INSERT INTO dbo.jugador (nombre) VALUES(@nameParameter)');

        return result.rowsAffected < 1 ? "Query succesfully processed" : "Error on database";
        } catch (error) {
            throw error;
        }
    },
    update: function(name) {

    },
    delete: async function(name) {
        const pool = await poolPromise;
        const result = await pool.request()
                                        .input('nameParameter', name)
                                        .query('INSERT INTO dbo.jugador (nombre) VALUES(@nameParameter)')
    }
}