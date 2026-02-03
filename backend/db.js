// // // db.js
// // const mysql = require("mysql2/promise");
// // module.exports = function createwampDBPool(config) {
// //   const pool = mysql.createPool({
// //     host: "localhost",
// //     user: "root",
// //     password: "",
// //     database: "signup_db",
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     queueLimit: 0
// //   });

// //   return pool;
// // };

// // db.js update
// const mysql = require("mysql2/promise");

// module.exports = function DbPool(config) {
//   const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "Azhizen@123", // Neenga set panna password inga varunom
//     database: "signup_db", // Database name correct-ah irukanum
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

//   return pool;
// };

// A:\Vinathaal\backend\config\db.js (or wherever your DB is initialized)
const mysql = require('mysql2/promise'); // <--- Ensure this is /promise
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'vinathaal_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;