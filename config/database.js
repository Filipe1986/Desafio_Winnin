const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig.js');




async function initialize() {
    console.log('Initializing database module ' + new Date("dd/MM/YY HH:mm"));
    const pool = await oracledb.createPool(dbConfig);
}
initialize()

module.exports.initialize = initialize;


async function close() {
    await oracledb.getPool().close();
}
   
module.exports.close = close;

function simpleExecute(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
      let conn;
      opts = {
        bindDefs: {
          TITULO: { type: oracledb.STRING , maxSize:300},
          AUTOR: { type: oracledb.STRING , maxSize:100 },
          NUMBER_UPS: { type: oracledb.NUMBER },
          NUMBER_COMENTARIOS: { type: oracledb.NUMBER }
        }
      };
      opts.outFormat = oracledb.OBJECT;
      opts.autoCommit = true;
   
      try {
        conn = await oracledb.getConnection();
        console.log(statement)
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
}
   
module.exports.simpleExecute = simpleExecute;


function execMany(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
    var opts = {
      bindDefs: {
        TITULO: { type: oracledb.STRING , maxSize:300},
        AUTOR: { type: oracledb.STRING , maxSize:100 },
        CRIACAO :{type: oracledb.STRING, maxSize:30},
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
}
 
module.exports.execMany = execMany;