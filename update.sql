-- UPDATE

USE ems_db;

-- to UPDATE employee role
UPDATE employee
SET employee.role_id = 002
WHERE employee.id = 0002;



-- to UPDATE employee managers
UPDATE employee
SET employee.manager_id = 003
WHERE employee.id = 0009