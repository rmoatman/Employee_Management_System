// DEPENDENCIES
//const fs = require("fs");
const inquirer = require('inquirer');
const emsBanner = require('./scripts/banner');
const mainMenu = require ('./scripts/prompts');


// VARIABLES




//FUNCTIONS
// Clears console and calls user prompts from prompts.js
function init(){
    emsBanner(); // displays EMS Banner from banner.js
    mainMenu(); // mainMenu is in prompts.js
};// end of init called from express.js

    









module.exports = init;