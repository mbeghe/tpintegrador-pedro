const fs = require('fs');
const { writeFixtureToFileSystem } = require('../helpers/fileManager');

module.exports = {
  generateFixture: function (err, tournmanentId, callback, res) {
    if(err){
      console.log(err);
      return;
    }

    if(tournmanentId == null){

      res.send(callback)
    }
    
    callback(tournmanentId, writeFixtureToFileSystem, res)
  }
}