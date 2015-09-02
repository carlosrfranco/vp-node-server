var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');
var bodyParser = require('body-parser')
var buscador_mock = require('./js/buscador-mock.js');
var buscador_ = require('./js/buscador.js');
var service = require("./js/service.js");

var router = express();
var server = http.createServer(router);
var buscador = service.buscador;

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.use(express.json());       // to support JSON-encoded bodies
router.use(express.urlencoded());

//buscador.setBuscador(buscador_mock.buscador);
buscador.setBuscador(buscador_.buscador);

router.get('/', function(req, res) {
  res.send('vp_server online');
});


router.post('/api/create', function(req, res) {
  var callback = function(r){
    console.log(r);
    res.send(r);
  }
  buscador.create(req.body, callback);
});

router.get('/api/all', function(req, res){
  console.log("calling getAll");
  var _callback = function (data) {
       console.log("mensagem enviada");
       res.send(data);
  }
  buscador.getAll(_callback);
});

router.get('/api/find/:id', function(req, res){
  var callback = function(data_found){
    res.send(data_found);
  }
  
  buscador.getById(req.params.id, callback);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
