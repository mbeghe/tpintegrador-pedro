const fs = require('fs');
var commonFunctions = require('../shared/commonFunctions');
var partidosManager = require('../../api/partidos');
const fixturePath = '../../../T3/fixtures/fixture.json';
const partidos = []

module.exports = {
    generarFixture: function (equipos) {
    var equiposArray = commonFunctions.convertToObjArray(equipos);
    var n = equiposArray.length;
    //var fechas = [];
    var matches = n-1;
    try{
    fs.writeFileSync(fixturePath, 'FIXTURE' + '\r\n')
    fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
    for (var r=1; r<n; r++) {
      fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
      fs.appendFileSync(fixturePath, 'Fecha' + r + '\r\n')
      fs.appendFileSync(fixturePath, '--------------------------' + '\r\n')
        for (i=1; i <= n/2; i++) {
          if (i==1)
          {
          var equipo1 = commonFunctions.formatear (equiposArray, 1 );
          var equipo2 = commonFunctions.formatear (equiposArray, (matches+r-1) % (matches) + 2);
          fs.appendFileSync(fixturePath, equipo1 + ' VS ' + equipo2 + '\r\n')
          commonFunctions.arrayLoader(partidos,(equipo1+'vs'+equipo2))
        }
          else
          {
          var equipo1 = commonFunctions.formatear (equiposArray, (r+i-2) % (matches) + 2 );
          var equipo2 = commonFunctions.formatear (equiposArray, (matches+r-i) % (matches) + 2);
          fs.appendFileSync(fixturePath, equipo1 + ' VS ' + equipo2 + '\r\n')
          commonFunctions.arrayLoader(partidos,(equipo1+'vs'+equipo2))
          }
        }
      }
    }catch(error)
    {
      console.log(error.message);
    }
      try{
        partidosManager.cargarPartidos(partidos);
        console.log("partidos cargados correctamente");
      }catch(error){
        console.log(error.message);
      }
    }
  }