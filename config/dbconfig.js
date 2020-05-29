module.exports = {
  user          : process.env.NODE_ORACLEDB_USER || "filipe",
  password      : process.env.NODE_ORACLEDB_PASSWORD || 'filipe123',
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/orcl",
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
  poolMin: 10,
  poolMax: 10,
  poolIncrement: 0
};