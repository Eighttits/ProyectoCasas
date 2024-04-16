const mysql = require("mysql");
const config = require("./config");

const mysqlConnection = mysql.createConnection(config);

mysqlConnection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Conexion exitosa");
  }
});

module.exports = mysqlConnection;
