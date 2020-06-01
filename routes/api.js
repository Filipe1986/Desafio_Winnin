var express = require('express');
var router = express.Router();
var database = require('../config/database');
var moment = require('moment');

const MILLISECONDS_ISO_8601 = 1000;
const BAD_REQUEST_CODE = 400;
const SERVER_ERROR_CODE = 500;


router.get('/postagens', async function (req, res, next) {
  inicial = moment(req.query.dataInicial).valueOf() / MILLISECONDS_ISO_8601;
  final = moment(req.query.dataFinal).valueOf() / MILLISECONDS_ISO_8601;
  var usuarios;

  try {
    if (req.query.ordem == "ups" && inicial && final) {
      sql = 'select * from postagem where criacao >= '
        + inicial
        + ' and criacao <= '
        + final
        + ' order by NUMBER_UPS desc';
      var result = await database.simpleExecute(sql);
      usuarios = result.rows.map(el => ({
        TITULO: el.TITULO,
        AUTOR: el.AUTOR,
        CRIACAO: moment(el.CRIACAO * MILLISECONDS_ISO_8601).format(),
        NUMBER_UPS: el.NUMBER_UPS,
        NUMBER_COMENTARIOS: el.NUMBER_COMENTARIOS

      }));
    } else if (req.query.ordem == "comentarios" && inicial && final) {
      sql = 'select * from postagem where criacao >= '
        + inicial + ' and criacao <= '
        + final +
        ' order by NUMBER_COMENTARIOS desc'
      var result = await database.simpleExecute(sql);
      usuarios = result.rows.map(el => ({
        TITULO: el.TITULO,
        AUTOR: el.AUTOR,
        CRIACAO: moment(el.CRIACAO * MILLISECONDS_ISO_8601).format(),
        NUMBER_UPS: el.NUMBER_UPS,
        NUMBER_COMENTARIOS: el.NUMBER_COMENTARIOS

      }));
    }else{
      res.status(BAD_REQUEST_CODE);
      res.json();
    }

  }catch(err) {
    console.log(err)
    res.status(SERVER_ERROR_CODE)
    res.json()
  }
  res.json(usuarios)
});

router.get('/usuarios', async function (req, res, next) {
  try {
    if (req.query.ordem == "ups") {
      var result = await database.simpleExecute('select * from postagem order by NUMBER_UPS desc');
      usuarios = result.rows.map(el => ({
        TITULO: el.TITULO,
        AUTOR: el.AUTOR,
        CRIACAO: moment(el.CRIACAO * MILLISECONDS_ISO_8601).format(),
        NUMBER_UPS: el.NUMBER_UPS,
        NUMBER_COMENTARIOS: el.NUMBER_COMENTARIOS

      }));
    } else if (req.query.ordem == "comentarios") {
      var result = await database.simpleExecute('select * from postagem order by NUMBER_COMENTARIOS desc');
      usuarios = result.rows.map(el => ({
        TITULO: el.TITULO,
        AUTOR: el.AUTOR,
        CRIACAO: moment(el.CRIACAO * MILLISECONDS_ISO_8601).format(),
        NUMBER_UPS: el.NUMBER_UPS,
        NUMBER_COMENTARIOS: el.NUMBER_COMENTARIOS

      }));
    } else {
      res.status(BAD_REQUEST_CODE);
    }

  } catch{
    res.status(SERVER_ERROR_CODE);
    res.json();
  }

  res.json(usuarios);
});

module.exports = router;
