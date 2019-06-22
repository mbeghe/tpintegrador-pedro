const tablaPath = '../../tabladeposiciones/tabladeposiciones.txt';
const tablaValues = '../../tabladeposiciones/tablavalues.json';
const partidosPath = '../../../T3/partidos/';
const fs = require('fs');
var util = require('util');
const path = require('path');
const { promisify } = require('util');
var commonFunctions = require('../shared/commonFunctions');
const puntajeInicial = 0;

module.exports = {
    crearTabla: function(equipos) {
      var equiposArray = commonFunctions.convertToObjArray(equipos);
      var n = equiposArray.length;
      var equipoValues = [];
      fs.writeFileSync(tablaPath, 'Tabla de posiciones' + '\r\n')
      fs.appendFileSync(tablaPath, '--------------------------' + '\r\n')
      fs.writeFileSync(tablaValues,'');
      for(var i =0; i<n; i++)
      {
        var equipo = commonFunctions.formatear (equiposArray, i+1 );
        equipoValues.push([{name: equipo, puntos: puntajeInicial}]);
        fs.appendFileSync(tablaPath, equipo + ': ' + puntajeInicial + '\r\n');
        
      }
      // equipoValues.forEach(function(v)
      // fs.writeFileSync(tablaValues, util.inspect(obj) , 'utf-8');
      // )
      //
  },
  cargarPartidos:function(partidos) {
    for(i = 0; i< partidos.length; i++){
      fs.writeFileSync(partidosPath+partidos[i]+'.txt',i);
    }
  },
   leerArchivos: function(partidosPath) {
    fs.readdir(partidosPath,function(err,files){
      if (err) throw err;
      files.forEach(function(file){
        if(file) {
          fs.readFile(partidosPath+file, 'utf8', function (err,data) {
            var details = [];
            if (err) {
              return console.log(err);
            }
            commonFunctions.arrayLoader(details,{name:file, content:data});
            console.log(details);
            return details;
          });
        }
      });
    });
  },

//  readFiles: function(){
//   fs.readdir(partidosPath,function(err,files){
//      if (err) throw err;
//     files.forEach(function(file){
//     fs.readFile(file, function(err, data) {
//     if(err) throw err;
//     var array = data.toString().split("\n");
//     for(i in array) {
//         console.log(array[i]);
//       }})
//     });
//   })
//  },
  // actualizarTabla: function(partidos){
  //   partidos.forEach(function(partido, err){
  //     var validFile =  commonFunctions.archivoValido(partido.name, partido.content);
  //     var readFIle =  commonFunctions.archivoLeido(partido.name);
  //     if(err) throw err;
  //     if(validFile){
  //       if(readFIle){
  //         console.log("el archivo"+ partido.name + "ya fue procesado");
  //       }else{
  //          console.log("el archivo"+ partido.name + "no fue procesado"); 
  //       }
  //     }else{
  //       console.log("archivo"+ partido.name+ "invalido");
  //     }
  //   })
  // },
  levantarTabla: function(tablaPath){
    console.log(fs.readFileSync(tablaPath));
  }
}
