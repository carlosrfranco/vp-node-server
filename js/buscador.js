// Retrieve
var MongoClient = require('mongodb').MongoClient;



var buscador_ = new function(){
    
  this.setCollection = function(c){
      this.collection = c;
      console.log("collecion set");
  }
  
  this.insert = function(json, callback){
      this.collection.insert(json, {w:1}, function(err, result) {
        if (err) {
            return console.log(err);
        }
            callback(result);
      });
  }
  
  this.getAll = function(callback){
    var cursor =this.collection.find( );
    var items = []
    var ocorr = {};
    cursor.each(function(err, item) {
        if (err) {
            return console.log(err);
        }
        if (item != null) {
         items.push(item);
      } else {
          ocorr.ocorrencias = items;
          console.log(ocorr);
          callback(ocorr);
      }
    });
    }
    
    this.getById = function(id, fn){
    
        this.collection.findOne({id:1}, function(err, item) {
            if (err) {
                return console.log(err);
            }
            console.log(item);
            fn(item);
        });
    }
};

// Connect to the db
MongoClient.connect("mongodb://0.0.0.0:27017/node-app-app", function(err, db) {
    if(err) { return console.dir(err); }
    buscador_.setCollection(db.collection('ocorrencias'));
});

exports.buscador = buscador_;