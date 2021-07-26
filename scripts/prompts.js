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
          viewAllEmpByDept();
          break;
      case "View a Single Employee":
          viewSingEmp();
          break;
      }
  }) 
}; // end of viewMenu

function viewAllEmp() {
  db.query('SELECT employee.id AS ID, CONCAT(first_name, " ", last_name) AS Employee, dept_name AS Department, role.title AS Title FROM department, employee, role WHERE employee.manager_id=role.id AND role.id=department.id', function (err, results) {
    console.log("");
    console.log("All Employees:")
    console.table(results);
    console.log("");
    mainMenu();
  });
}; // end of viewAllEmp();

function viewAllEmpByRol() {

  const roleList = [];

  db.query('SELECT title FROM role', function (err, results) {
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

        console.log("");
        console.log(`Employees who have the title of ${answer.viewRole}:`)
        console.table(results);
        console.log("");
        mainMenu();
        
      }) // end of query
    }) // end of then
  }) // end of inquirer
}; // end of viewAllEmpByRol

function viewAllEmpByMng() {

  const mngrList = [];
  
    db.query('SELECT CONCAT(manager_name.first_name, " ", manager_name.last_name) AS Manager FROM employee INNER JOIN employee AS manager_name ON employee.manager_id = manager_name.id', function (err, results) {
      console.log("results");
      console.log(results);
      console.log
      for (i = 0; i < results.length; i++){
        if(!mngrList.includes(results[i].Manager)){
          mngrList.push(results[i].Manager);
        };
      }
  
    console.clear();
  
    inquirer
      .prompt([
        {
        type:'list',
        name:'viewMngr',
        message: "Which manager would you like to view?",
        choices: mngrList,
        }, 
      ]).then ((answer) => {
  
        db.query('SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Employee, CONCAT (manager_name.first_name, " ", manager_name.last_name) AS Manager FROM employee INNER JOIN employee AS manager_name ON employee.manager_id = manager_name.id WHERE CONCAT (manager_name.first_name, " ", manager_name.last_name) = ?', [answer.viewMngr], function (err, results) {
        
        console.log("");
        console.log(`Employees who work for ${answer.viewMngr}:`)
        console.table(results);
        console.log("");
        mainMenu();
 

        }) // end of query
      }) // end of then
    }) // end of inquirer
}; // end of viewAllEmpByMngr

function viewAllEmpByDept() {
  const deptList = [];
  
    db.query('SELECT dept_name FROM department', function (err, results) {
      console.log("results");
      console.log(results);
      console.log
      for (i = 0; i < results.length; i++){
        if(!deptList.includes(results[i].dept_name)){
          deptList.push(results[i].dept_name);
        };
      }
  
    console.clear();
  
    inquirer
      .prompt([
        {
        type:'list',
        name:'viewDept',
        message: "Which department would you like to view?",
        choices: deptList,
        }, 
      ]).then ((answer) => {
  
        db.query('SELECT employee.id AS ID, CONCAT(first_name, " ", last_name) AS Employee, dept_name AS Department FROM department, employee, role WHERE employee.manager_id=role.id   AND role.id=department.id AND dept_name = ?', [answer.viewDept], function (err, results) {
        
        console.log("");
        console.log(`Employees in ${answer.viewDept}`);
        console.table(results);
        console.log("");
        mainMenu();

        }) // end of query
      }) // end of then
    }) // end of inquirer
}; // end of viewAllEmpByDept

function viewSingEmp() {
  const empList = [];
  
    db.query('SELECT CONCAT(first_name, " ", last_name) AS Employee FROM employee', function (err, results) {
      console.log("results");
      console.log(results);
      console.log
      for (i = 0; i < results.length; i++){
        if(!empList.includes(results[i].Employee)){
          empList.push(results[i].Employee);
        };
      }
  
    console.clear();
  
    inquirer
      .prompt([
        {
        type:'list',
        name:'viewEmp',
        message: "Which Employee would you like to review?",
        choices: empList,
        }, 
      ]).then ((answer) => {
  
        db.query('SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Employee, role.title AS Title, role.salary AS Salary, department.dept_name AS Department FROM department, employee, role WHERE employee.role_id=role.id AND role. department_id=department.id AND CONCAT(employee.first_name, " ", employee.last_name) = ?', [answer.viewEmp], function (err, results) {
  
        console.log("");
        console.table(results);
        console.log("");
        mainMenu();

        }) // end of query
      }) // end of then
    }) // end of inquirer
  }; // end of viewSingEMp



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
