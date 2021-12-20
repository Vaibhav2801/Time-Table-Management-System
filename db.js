const mysql = require("mysql2");
const dbConfig = require("./config/db.config.js");

// Create a connection to the database
const pool = mysql.createPool({
  connectionLimit : 5,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
pool.getConnection(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = pool;
