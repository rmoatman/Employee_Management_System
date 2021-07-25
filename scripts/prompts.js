const { response } = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
//const db = require ('../express')

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'ems_db'
  },
  console.log(`Connected to the ems_db database.`)
);


// MAIN MENU //
function mainMenu(){
  inquirer
    .prompt([
      {
      type:'list',
      name:'tasks',
      message: "What would you like to do?",
      choices: [
        "View Existing Employee, Manager, or Department",
        "Modify Existing Employee, Manager, or Department",
        "Add New Employee, Manager, or Department",
        "EXIT",
        ],
      }, 
      
    ]).then ((answer) => {
        switch (answer.tasks) {
          case "View Existing Employee, Manager, or Department":
            console.clear();
            viewMenu();
            break;
          case "Modify Existing Employee, Manager, or Department":
            modifyMenu();
            break;
          case "Add New Employee, Manager, or Department":
            addMenu();
            break;
            case "EXIT":
              exit();
              break;
        }
    }) 
}// end of main menu


// VIEW MENU
function viewMenu() {
  inquirer
  .prompt([
    {
    type:'list',
    name:'viewTasks',
    message: "What would you like to view?",
    choices: [
      "View all Employees",
      "View all Employees in a specific Role",
      "View all Employees assigned to a specific Manager",
      "View all Employees in a specific Department",
      "View a Single Employee",  
      ],
    }, 
  
  ]).then ((answer) => {
      switch (answer.viewTasks) {
        case "View all Employees":
          console.clear();
          viewAllEmp();
          break;
        case "View all Employees in a specific Role":
          viewAllEmpByRol();
          break;
        case "View all Employees assigned to a specific Manager":
          viewAllEmpByMng();
          break;
      case "View all Employees in a specific Department":
          viewAAllEmpByDept();
          break;
      case "View a Single Employee":
          viewSingEmp();
          break;
      }
  }) 
}; // end of viewMenu


function viewAllEmp() {
  console.log("All Employees:");
  db.query('SELECT employee.id AS ID, CONCAT(first_name, " ", last_name) AS Employee, dept_name AS Department, role.title AS Title FROM department, employee, role WHERE employee.manager_id=role.id AND role.id=department.id', function (err, results) {
    console.table(results);
    //console.table(JSON.stringify(results));
    mainMenu();
  });
}; // end of viewAllEmp();




function viewAllEmpByRol(){

  const roleList = [];

  db.query('SELECT title FROM role', function (err, results) {
    console.log("results");
    console.log(results);
    for (i = 0; i < results.length; i++){
      if(!roleList.includes(results[i].title)){
        roleList.push(results[i].title);
      };
    }

    console.clear();
    inquirer
    .prompt([
      {
      type:'list',
      name:'viewRole',
      message: "Which role would you like to view?",
      choices: roleList
      }, 
    ]).then ((answer) => {

      db.query('SELECT employee.id AS ID, CONCAT(first_name, " ", last_name) AS Employee, role.title AS Role, dept_name AS Department FROM role INNER JOIN employee ON role.id = employee.role_id INNER JOIN department ON role.department_id = department.id WHERE role.title = ?', [answer.viewRole], function (err, results) {
        
        console.table(results);
        mainMenu();
      })

    }) // end of then
  }) // end of query
}; // end of viewAllEmpByRol



function viewAllEmpByMng(){};
function viewAAllEmpByDept(){};
function viewSingEmp(){}


// MODIFY MENU
function modifyMenu() {
  inquirer
  .prompt([
    {
    type:'list',
    name:'modifyTasks',
    message: "What would you like modify?",
    choices: [
      "Update Employee Manager",
      "Update Employee Department",
      ],
    }, 
  
  ]).then ((answer) => {
      switch (answer.modifyTask) {
        case "Update Employee Manager":
          updEmpMngr();
          break;
        case "Update Employee Department":
          updEmpDept();
          break;
      }
  }) 
} // end of modifyMenu

function updEmpMngr(){};
function updEmpMngr(){};


// ADD MENU
function addMenu() {
  inquirer
    .prompt([
      {
      type:'list',
      name:'addTasks',
      message: "What would you like to add?",
      choices: [
        "Add a new Employee",
        "Add a new Manager",
        "Add a new Department"
        ],
      }, 
    
    ]).then ((answer) => {
        switch (answer.modifyTask) {
          case "Add a new Employee":
            addEmp();
            break;
          case "Add a new Manager":
            addMngr();
            break;
          case "Add a new Department":
            addDept();
            break;
        }
  }) 
} // end of addMenu

function addEmp(){};
function addMngr(){};
function addDept(){};
function exit(){
  console.clear();
  console.log("Thanks.  Have a nice day!")
  process.exit();
};







module.exports = mainMenu
