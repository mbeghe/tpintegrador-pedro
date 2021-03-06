const request = require('request-promise-native');

async function createTeamTest(serverUrl) {

    const newEquipo = [{ id: 1,name: "Atlanta"}];
    let testResult = true;

    const options = {
        method: 'POST',
        uri: `${serverUrl}/crear-equipo`,
        body: newEquipo,
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
        console.log("crear equipo: ok")
    }
}

module.exports = createTeamTest