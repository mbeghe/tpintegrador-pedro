const request = require('request-promise-native');

async function createTournamentTest(serverUrl) {

    const newTorneo = { 
        "id": 1, "teams": 
        [
            {"name":1, "points":0},
            {"name":2, "points":0},
            {"name":3, "points":0},
            {"name":4, "points":0},
            {"name":5, "points":0},
            {"name":6, "points":0},
            {"name":7, "points":0},
            {"name":8, "points":0}
        ]
    }
    let testResult = true;

    const options = {
        method: 'POST',
        uri: `${serverUrl}/crear-torneo`,
        body: newTorneo,
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
        console.log("crear torneo: ok")
    }
}

module.exports = createTournamentTest