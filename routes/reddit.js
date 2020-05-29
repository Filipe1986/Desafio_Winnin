var express = require('express');
var router = express.Router();
var database = require('./../config/database');


router.get('/postagens', async  function(req, res, next) {
      var result = await  database.simpleExecute('select * from postagem');
    res.json(result.rows)
});

router.get('/usuarios', async function(req, res, next) {

  usuarios = {
    'usuarios' : ['Joao', 'Marcelo', 'Filipe']
  }
  res.json(usuarios)
});

module.exports = router;
