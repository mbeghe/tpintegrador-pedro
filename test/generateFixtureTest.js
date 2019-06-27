const request = require('request-promise-native');

async function generateFixture(serverUrl) {

    let testResult = true;

    const options = {
        uri: `${serverUrl}/generate-fixture?id=1`,
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
        console.log("crear fixture: ok")
    }
}

module.exports = generateFixture