// DEPENDENCIES
const express = require("express");
const fs = require("fs");
const init = require("./index");
const mysql = require('mysql2');

// const { uid } = require("uid");
// const cTable = require('console.table');
// const CFonts = require('cfonts');


// VARIABLES
//const data = fs.readFileSync("./db/db.json", "utf-8");
// const emsData = JSON.parse(data);

const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password
//     password: 'password',
//     database: 'ems_db'
//   },
//   console.log(`Connected to the ems_db database.`)
// );

// FUNCTIONS
// save emsData to file
// function saveEmsData(data) {
//   fs.writeFile(
//     path.join(__dirname, "/db/db.json"),
//     JSON.stringify(data),
//     (err) => (err ? console.err(err) : console.log("EMS Data Saved!"))
//   );
// }




// LISTENER AND EXECUTION
app.listen(PORT, () => {
  console.log(`Server is online and listening on PORT: ${PORT}`);
  console.clear();
  init();
}); // end of listener


module.exports = express