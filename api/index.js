const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var jugadoresRepository = require('../repository/jugadoresRepository');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// APIs Jugadores
app.post('/agregar-jugador', function(req, res) {
    try {
        console.log("Incoming request.")
        var result = jugadoresRepository.create(req.body.name) 
        
        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.put('/actualizar-jugador', function(req, res) {
    try {
        console.log("Attempt to update player received.")
        var result = jugadoresRepository.update(req.body.name, req.body.equipo) 
        
        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.delete('/eliminar-jugador', function(req, res) {
    try {
        console.log("Attempting to delete record.")
        var result = jugadoresRepository.delete(req.body.name) 
        
        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.listen(3000, () => {
    console.log("Up and running");
});