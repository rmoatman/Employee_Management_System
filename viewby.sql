-- VIEW

USE ems_db;

-- to SHOW all tables
SHOW tables;

-- to SHOW all departments
SELECT * FROM department;

-- to SHOW all roles
SELECT 
	role.id AS "ID Number",
    role.title AS Title,
    role.salary AS Salary,
    department.dept_name AS Department
FROM role
INNER JOIN department
ON role.department_id = department.id

-- EMPLOYEES
	-- to SHOW all employees
	SELECT * FROM employee;
    
    -- to SHOW all employees in each department
	SELECT CONCAT(first_name, " ", last_name) AS Employee, dept_name AS Department
		FROM department, employee, role
		WHERE employee.manager_id=role.id
		AND role.id=department.id
        
	-- to SHOW all employees by Manager
	SELECT
	CONCAT(employee.first_name, " ", employee.last_name) AS Employee,
	CONCAT (manager_name.first_name, " ", manager_name.last_name) AS Manager
		FROM employee
		INNER JOIN employee AS manager_name
		ON employee.manager_id = manager_name.id
        
   	-- by salary
	SELECT CONCAT(e.first_name, " ", e.last_name) AS Employee, r.salary AS Salary
		FROM employee AS e, role AS r
		WHERE e.role_id=r.id
		-- replace > with other operators
		-- rplace 25000 with input
		AND r.salary > 20000


