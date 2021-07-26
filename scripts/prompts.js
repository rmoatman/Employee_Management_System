const inquirer = require('inquirer');
const mysql = require('mysql2');

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
        "Modify Employee Role",
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
          case "Modify Employee Role":
            modifyRole();
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
  db.query('SELECT employee.id AS ID, CONCAT(first_name, " ", last_name) AS Employee, role.title AS Role, dept_name AS Department FROM role INNER JOIN employee 		ON role.id = employee.role_id INNER JOIN department 		ON role.department_id = department.id', function (err, results) {
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
function modifyRole() {

  // get employee list
  const empList = [];
  db.query('SELECT CONCAT(first_name, " ", last_name) AS Employee FROM employee', function (err, results) {
    for (i = 0; i < results.length; i++){
      if(!empList.includes(results[i].Employee)){
        empList.push(results[i].Employee);
      };
    };

    inquirer
    .prompt([
      {
      type:'list',
      name:'empToMod',
      message: "Which employee would you like to modify?",
      choices: empList
      }, 
    
    ]).then ((answer) => {
      // get roleList
      const emplToUpdate = JSON.stringify(answer.empToMod);
      const roleList = [];

      db.query('SELECT title AS roleid from role', function (err, results) {
        for (i = 0; i < results.length; i++){
          if(!roleList.includes(results[i].roleid)){
            roleList.push(results[i].roleid);
          };
        };

        inquirer
        .prompt([
          {
          type:'list',
          name:'newRole',
          message: "What is the New Role?",
          choices: roleList
          }, 

        ]).then ((answer) => {
          const roleToUpdate = JSON.stringify(answer.newRole);
          const nameStr = emplToUpdate.replace( /"/g, "");
          const nameObj = nameStr.split(" ");

          // get employee number
          db.query('SELECT employee.id AS ID FROM employee WHERE first_name = ? AND last_name = ?', [nameObj[0], nameObj[1]],  function (err, empNo){

            // get role number
            const roleStr = roleToUpdate.replace( /"/g, "");
            db.query('SELECT id from role where title = ?', [roleStr], function (err, rolNo){
              r_id = (rolNo[0].id);
              e_id = (empNo[0].ID);
            
              // update employee
              db.query('UPDATE employee SET employee.role_id = ? WHERE employee.id = ?', [r_id, e_id], function (err, results){
                console.log("Employee successfully updated!");
                console.clear();
                mainMenu();
              }); // end of Update

            }); // end of get role number
          }); // end of get employee number
        }); // end of roleList then
      }); // end of roleList query
    }); // end of empList then
  }); // end of empList query
}; // end of modifyRole

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
        switch (answer.addTasks) {
          case "Add a new Employee":
            console.clear();
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
}; // end of addMenu

function addEmp(){
console.log("addEmp");
  const roleList = [];
    db.query('SELECT title AS roleid from role', function (err, results) {
      for (i = 0; i < results.length; i++){
        if(!roleList.includes(results[i].roleid)){
          roleList.push(results[i].roleid);
        }; // end of if
      }; // end of for

  const mngrList = [];
    db.query('SELECT CONCAT(manager_name.first_name, " ", manager_name.last_name) AS Manager FROM employee INNER JOIN employee AS manager_name ON employee.manager_id = manager_name.id', function (err, results) {

      for (i = 0; i < results.length; i++){
        if(!mngrList.includes(results[i].Manager)){
          mngrList.push(results[i].Manager);
        }; // end of if
      }; // end of for

    inquirer
    .prompt([
      {
      type:'input',
      name:'empFirstName',
      message: "What is the Employee's First Name?",
      }, 

      {
        type:'input',
        name:'empLastName',
        message: "What is the Employee's Last Name?",
      }, 

      {
        type:'list',
        name:'empRole',
        message: "What is the Employee's role?",
        choices: roleList,
      }, 

      {
        type:'list',
        name:'empMngr',
        message: "Who is the Employee's manager?",
        choices: mngrList,
      }, 
  
        ]).then ((answer) => {

          // get role.id
          const roleStr = answer.empRole.replace( /"/g, "");
          db.query('SELECT id from role where title = ?', [roleStr], function (err, rolNo){
            r_id = (rolNo[0].id);

            // get manager.id
            const idStr = answer.empMngr.replace( /"/g, "");
            db.query('SELECT employee.id FROM employee WHERE CONCAT (employee.first_name, " ", employee.last_name) = ?', [idStr], function (err, idNo){
              e_id = (idNo[0].id);

              // update database
              db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.empFirstName, answer.empLastName, r_id, e_id], function (err, result) {
                console.clear();
                console.log("Employee has been successfully added!");
                mainMenu();
              }); // end of update database
            });// end of manager.id query
          }); // end of role.id query
        }); // end of then
      }) // end of mngrList query
    }); // end of roleList query
}; // end of addEmployee

function addMngr(){

}; // end of addMngr

function addDept(){

}; // end of add Dept


function exit(){
  console.clear();
  console.log("Thanks.  Have a nice day!")
  process.exit();
};

module.exports = mainMenu
