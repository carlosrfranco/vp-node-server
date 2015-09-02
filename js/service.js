var fs = require('fs');
var path = require('path');

var buscador = new function(){
    
    this.setBuscador = function(buscador){
        this.buscador = buscador;
    }
    
    this.create = function(json, callback){
        return this.buscador.insert(json, callback);
    }
    
    this.getAll = function(callback){
        return this.buscador.getAll(callback);
    }
    
    this.getById = function(id, fn){
        this.buscador.getById(id, fn);

    }
};

exports.buscador = buscador;