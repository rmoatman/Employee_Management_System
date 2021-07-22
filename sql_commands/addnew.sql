-- ADD

USE ems_db;

-- to ADD new department:
INSERT INTO department (id, dept_name)
    VALUES
        (XX, "XXXXX"),
        
-- to ADD new role:
-- NOTE:  Salary will be #####.##
INSERT INTO role (id, title, salary, department_id)
    VALUES
        (xxx, "XXX", "XXXXX", XX),
        
-- to ADD new employee:
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
        (XXXX, "XXXXX", "XXXXX", XXX, XXX),

