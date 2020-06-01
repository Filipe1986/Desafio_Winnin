var express = require('express');
var router = express.Router();
var database = require('../config/database');
var moment = require('moment'); 


router.get('/postagens', async  function(req, res, next) {
  console.log(moment(req.query.dataInicia).valueOf())
  try{
    if(req.query.ordem == "ups" && req.query.dataInicial  && req.query.dataFinal){
      sql  = 'select * from postagem where criacao >= \''+ req.query.dataInicial +'\' and criacao <= \''+ req.query.dataFinal+ '\' order by NUMBER_UPS desc';
      var result = await  database.simpleExecute(sql);
      usuarios = result.rows.map(el=>{
        TITULO              : el.TITULO             
        AUTOR               : el.AUTOR                
        CRIACAO             : el.CRIACAO            
        NUMBER_UPS          : el.NUMBER_UPS         
        NUMBER_COMENTARIOS  : el.NUMBER_COMENTARIOS 

      })
    }else if(req.query.ordem == "comentarios"  && req.query.dataInicial  && req.query.dataFinal){
      sql = 'select * from postagem where criacao >= \''+ req.query.dataInicial +'\' and criacao <= \''+ req.query.dataFinal +'\' order by NUMBER_COMENTARIOS desc'
      var result = await  database.simpleExecute(sql);
      usuarios = result.rows.map(el=>{
        TITULO              : el.TITULO             
        AUTOR               : el.AUTOR                
        CRIACAO             : el.CRIACAO            
        NUMBER_UPS          : el.NUMBER_UPS         
        NUMBER_COMENTARIOS  : el.NUMBER_COMENTARIOS 

      })
    }else{
      res.status(400)
      res.json()
    }

  }catch(err){
    console.log(err)
    res.status(500)
    res.json()
  }

  res.json(usuarios)
});

router.get('/usuarios', async function(req, res, next) {
  try{
    if(req.query.ordem == "ups"){
      var result = await  database.simpleExecute('select * from postagem order by NUMBER_UPS desc');
      usuarios = result.rows.map(el=>({
        TITULO             : el.TITULO,             
        AUTOR               : el.AUTOR ,               
        CRIACAO             : moment(el.CRIACAO * 1000).format(),           
        NUMBER_UPS          : el.NUMBER_UPS,         
        NUMBER_COMENTARIOS  : el.NUMBER_COMENTARIOS 

      }));
    }else if(req.query.ordem == "comentarios"){
      var usuarios = await  database.simpleExecute('select * from postagem order by NUMBER_COMENTARIOS desc');
    }else{
      res.status(400)
    }

  }catch{
    res.status(400)
    res.json()
  }

  res.json(usuarios)
});

module.exports = router;
