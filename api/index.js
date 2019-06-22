const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var jugadoresRepository = require('../repository/jugadoresRepository');
var equiposRepository = require('../repository/equiposRepository');
var { getTeamByTournamentId } = require('../repository/torneosRepository');
var matches = require('../helpers/partidos');
var { generateFixture } = require('../helpers/fixtureManager');

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

// API equipos
app.post('/crear-equipo', function(req, res) {
    try {
        console.log("Attempting to create team.")
        var result = equiposRepository.create(req.body)

        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.put('/actualizar-equipo', function(req, res) {
    try {
        console.log("Attempt to update team received.")
        var result = equiposRepository.update(req.body.name, req.body.teamId) 
        
        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.delete('/eliminar-equipo', function(req, res) {
    try {
        console.log("Attempting to delete team.")
        var result = equiposRepository.delete(req.body.id) 
        
        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.post('crear-torneo', function(req, res) {
    try {
        console.log("Creating tournament with id" + req.body.id);
        var result = torneosRepository.create(req.body.teams, req.body.id)

        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.put('actualizar-torneo', function(req, res) {
    try {
        console.log("Updating point values for tournament" + req.body.id);
        var result = torneosRepository.update(req.body.teams, req.body.id)

        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.delete('eliminar-torneo', function(req, res) {
    try {
        console.log("Deleting team" + req.body.teamId + " from tournament" + req.body.id);
        var result = torneosRepository.delete(req.body.teamId, req.body.id)

        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.post('/cargar-partidos', function(req, res) {
    try {
        console.log("Loading matchs json");
        var result= matches.processMatches(req.body);

        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

app.get('/generate-fixture', function(req, res) {
    console.log("Generating fixture...");

    generateFixture(null, req.query.id, getTeamByTournamentId, res)
})

app.listen(3000, () => {
    console.log("Up and running");
});