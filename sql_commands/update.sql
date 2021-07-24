-- UPDATE

USE ems_db;


-- to UPDATE employee
Update Employee
set Last_name = <lastname>,
First_Name = <firstname>
where ID = <emp_id>

Update e
set e.Last_name = ,
r.Title = 
from Employee e
inner join role r on role_id = r.id
where e.id = 
-- to UPDATE employee role

-- to UPDATE employee managers