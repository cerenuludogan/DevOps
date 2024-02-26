const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "ceros335",
  database: "example-app",
});

module.exports = connection;
