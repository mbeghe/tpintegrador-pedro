const request = require('request-promise-native');

async function createTeamTest(serverUrl) {

    const newEquipo = [{ id: 1,name: "Atlanta"}];

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
        } else if (!result.hasOwnProperty('nombre')) {
            console.log("post: el estudiante recibido no tiene nombre")
        } else if (!result.hasOwnProperty('apellido')) {
            console.log("post: el estudiante recibido no tiene apellido")
        } else if (!result.hasOwnProperty('edad')) {
            console.log("post: el estudiante recibido no tiene edad")
        } else if (!result.hasOwnProperty('dni')) {
            console.log("post: el estudiante recibido no tiene dni")
        }
    } catch (err) {
        console.log(err.error)
        // if (err.statusCode == 400) {
        //     console.log("post: error - peticion mal formada")
        // } else if (err.statusCode == 500) {
        //     console.log("post: error - el servidor no pudo realizar lo pedido")
        // } else {
        //     console.log("post: error inesperado")
        // }
        testResult = false
    }
}

module.exports = createTeamTest