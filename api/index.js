const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var { create } = require('../repository/jugadoresRepository');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/agregar-jugador', function(req, res) {
    try {
        console.log("Incoming request.")
        var result = create(req.body.name) 
        
        res.send(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
})
app.listen(3000, () => {
    console.log("Up and running");
});