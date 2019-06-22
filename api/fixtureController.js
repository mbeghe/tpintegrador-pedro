const fixtureManager = require('./fixtureManager');
const commonFunctions = require('../shared/commonFunctions');
const partidos = require('./partidos');
const partidosPath = '../../../T3/partidos/';
const tablaPath = '../../tabladeposiciones/tabladeposiciones.txt';
const equipos = ['river','boca','racing','velez','independiente','union'];

const resultados = [{name:'racingvsvelez.txt', content:'river'},
                    {name:'velezvsindependiente.txt', content:'empate'}, 
                    {name:"asd",content:'empate'}, 
                    {name:'bocavsracing.txt', content:"asd"},
                    {name:'bocavsracingprocesado.txt', content:"boca"}];
var details = [];

// try{
//     fixtureManager.generarFixture(equipos);
//     console.log("Fixture generado correctamente");
//     partidos.crearTabla(equipos);
//     console.log("Tabla de posiciones generada correctamente");
//     }
//     catch(error){
//     console.log(error.message);
// }

 console.log("leyendo archivos");
var details = partidos.leerArchivos(partidosPath)
console.log(details);

// // console.log('leyendo archivos');
//  partidos.readFiles(partidosPath);

// partidos.leerArchivos(partidosPath);



// var valido = commonFunctions.archivoValido('racingvsvelez.txt', 'river');
// var valido2 = commonFunctions.archivoValido('racingvsvelez.txt', 'racing');
// console.log("archivo racingvsvelez.txt: "  +  valido);
// console.log("archivo'racingvsvelez.txt: " + valido2);
// var leido = commonFunctions.archivoLeido('racingvsvelez.txt');
// var leido2 = commonFunctions.archivoLeido('racingvsvelez-procesado.txt');
// console.log("archivo racingvsvelez.txt: " + leido);
// console.log("archivo racingvsvelez-procesado.txt: " + leido2);

// partidos.actualizarTabla(resultados);