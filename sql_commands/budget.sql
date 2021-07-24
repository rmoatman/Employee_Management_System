--  ANNUAL BUDGET BY DEPARTMENT

USE ems_db;

SELECT SUM(role.salary)
    FROM department, employee, role
    WHERE employee.role_id=role.id
    AND role.department_id = department.id
    -- change 3 to input
    AND department.id = 3