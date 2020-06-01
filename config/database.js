const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig.js');

const TABLE_DONT_EXIST_CODE = 942;
const CREATE_TABLE =
`CREATE TABLE POSTAGEM 
(
  TITULO VARCHAR2(300 BYTE) 
, AUTOR VARCHAR2(100 BYTE) 
, CRIACAO NUMBER 
, NUMBER_UPS NUMBER 
, NUMBER_COMENTARIOS NUMBER 
)`;

async function initialize() {
  let conn;
    try {
      console.log('Initializing database module ');
      const pool = await oracledb.createPool(dbConfig);

      conn = await oracledb.getConnection();
      await conn.execute("Select * from POSTAGEM");
    }catch(err){
      if(err.errorNum == TABLE_DONT_EXIST_CODE){
        try{
          await conn.execute(CREATE_TABLE); 
          console.log("Tabela POSTAGEM CRIADA");
        }catch(err){
          console.log(err);
        }
        
      }else{
        console.log(err);
      }
    }
}
initialize();

module.exports.initialize = initialize;


async function close() {
    await oracledb.getPool().close();
};
   
module.exports.close = close;

function simpleExecute(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
      let conn;
      opts = {
        bindDefs: {
          TITULO: { type: oracledb.STRING , maxSize:300},
          AUTOR: { type: oracledb.STRING , maxSize:100 },
          CRIACAO: { type: oracledb.NUMBER },
          NUMBER_UPS: { type: oracledb.NUMBER },
          NUMBER_COMENTARIOS: { type: oracledb.NUMBER }
        }
      };
      opts.outFormat = oracledb.OBJECT;
      opts.autoCommit = true;
   
      try {
        conn = await oracledb.getConnection();
        const result = await conn.execute(statement, binds, opts);
        
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        if (conn) { // conn assignment worked, need to close
          try {
            await conn.close();
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
};
   
module.exports.simpleExecute = simpleExecute;


function execMany(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
    var opts = {
      bindDefs: {
        TITULO: { type: oracledb.STRING , maxSize:300},
        AUTOR: { type: oracledb.STRING , maxSize:100 },
        CRIACAO :{type: oracledb.NUMBER},
        NUMBER_UPS: { type: oracledb.NUMBER },
        NUMBER_COMENTARIOS: { type: oracledb.NUMBER }
      }
    };
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
 
    try {
      conn = await oracledb.getConnection();
      const result = await conn.executeMany(statement, binds, opts);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
};
 
module.exports.execMany = execMany;