var fs = require('fs');
var path = require('path');

var buscador_mock = new function(){
    
   this.getAll = function(callback){
       var _callback = function (err,data) {
        if (err) {
            return console.log(err);
        }
            callback(JSON.parse(data));
        };
        return getMockList(_callback);
    }
    
    this.getById = function(id, fn){
        var callback = function(err, data){
            if (err) {
                return console.log(err);
            }
            var data_found = {};
            var data_json = JSON.parse(data);
            var ocorrencias = data_json.ocorrencias;
            
            for(var i = 0; i<ocorrencias.length; i++){
                if(ocorrencias[i].id == id){
                    data_found = ocorrencias[i];
                }
            }
            
            fn(data_found);
        }
        
        getMockList(callback);

    }
    
    var getMockList = function(callback){
        fs.readFile(path.resolve(__dirname, '../json/mocks') + '/ocorrencias_mock.json', 'utf8', callback)
    }
}

exports.buscador = buscador_mock;