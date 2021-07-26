USE ems_db;

INSERT INTO department (id, dept_name)
    VALUES
        (01, "Accounting"),
        (02, "Sales"),
        (03, "Service");

INSERT INTO role (id, title, salary, department_id)
    VALUES
        (001, "AcctMngr", 50000, 01),
        (002, "SlsMngr", 50001, 02),
        (003, "SvcMngr", 50002, 03),
        (004, "Accountant", 30000, 01),
        (005, "Salesman", 30001, 02),
        (006, "Technician", 30002, 03);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
        (0001, "Bob", "Smith", 001, 001),
        (0002, "Jane", "Doe", 002, 002),
        (0003, "John", "Miller", 003, 003),
        (0004, "Angela", "Miller", 004, 001),
        (0005, "Kim", "Duda", 005, 002),
        (0006, "Penelope", "Love", 006, 003),
        (0007, "Pete", "Smart", 004, 001),
        (0008, "Michele", "Hauck", 005, 002),
        (0009, "Dave", "Hulburt", 006, 003);