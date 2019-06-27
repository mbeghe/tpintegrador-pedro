const request = require('request-promise-native');

async function createPlayerTest(serverUrl) {

    const newPlayer = { "id":1, "nombre":"Rodriguez", "equipo":1 }
        
    let testResult = true;

    const options = {
        method: 'POST',
        uri: `${serverUrl}/agregar-jugador`,
        body: newPlayer,
        json: true
    }

    try {
        const result = await request(options)

        if (!result) {
            console.log("post: no hay datos")
        }
    } catch (err) {
        console.log(err.error)
        testResult = false
    }
    if (testResult) {
        console.log("crear jugador: ok")
    }
}

module.exports = createPlayerTest