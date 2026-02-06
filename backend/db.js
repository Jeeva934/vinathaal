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
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initializeDb() {
    // Ithu 'database.sqlite' nu oru file-ah create pannum
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    // Users table create pannuvom
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_token TEXT,
            name TEXT,
            email TEXT UNIQUE,
            password_hash TEXT,
            role TEXT,
            api_token TEXT,
            reset_token TEXT,
            reset_token_expires TEXT
        )
    `);

    console.log("SQLite Database & Table Created!");
    return db;
}

module.exports = initializeDb;