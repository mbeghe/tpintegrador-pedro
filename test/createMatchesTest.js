const request = require('request-promise-native');

async function createMatchesTest(serverUrl) {

    const partidos  =
    { "tournamentId": 1,
        "matches":
        [
        {"id": 3, "team1":1, "team2":5, "result":1},
        {"id": 4, "team1":3, "team2":7, "result":-1},
        {"id":5, "team1":3, "team2":8, "result":-1}
        ]
    }

    let testResult = true;

    const options = {
        method: 'POST',
        uri: `${serverUrl}/cargar-partidos`,
        body: partidos,
        json: true
    }

    try {
        const result = await request(options)
        console.log(result);

        if (!result) {
            console.log("post: no hay datos")
        }
    } catch (err) {
        console.log(err.error)
        testResult = false
    }
    if (testResult) {
        console.log("cargar partidos: ok")
    }
}

module.exports = createMatchesTest