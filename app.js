var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./config/database.js')
const cron = require("node-cron");
var serv = require("./services/services")

var redditRouter = require('./routes/reddit');

var app = express();

var date = new Date();
cron.schedule(date.getMinutes()+1 + " " + date.getHours() +" * * *", async () => {
  console.log("Execução da Atividade Agendada")
  var result = await serv.requisicaoPostagem('t3_g0s6kc', [])
  const sqlQuery = `INSERT INTO POSTAGEM (TITULO, AUTOR, CRIACAO,  NUMBER_UPS,  NUMBER_COMENTARIOS ) 
                    VALUES ( :TITULO, :AUTOR, :CRIACAO, :NUMBER_UPS, :NUMBER_COMENTARIOS)`;

  await database.execMany(sqlQuery, result)
  
});


// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', redditRouter);

module.exports = app;
