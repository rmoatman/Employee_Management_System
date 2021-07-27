// DEPENDENCIES
const express = require("express");
const fs = require("fs");
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;
const inquirer = require('inquirer');
const emsBanner = require('./scripts/banner');
const mainMenu = require ('./scripts/prompts');
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//FUNCTIONS
function init(){
    emsBanner(); // displays EMS Banner from banner.js
    mainMenu(); // mainMenu is in prompts.js
};// end of init

// LISTENER AND EXECUTION
app.listen(PORT, () => {
  console.log(`Server is online and listening on PORT: ${PORT}`);
  init();
}); // end of listener


module.exports = express