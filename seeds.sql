USE ems_db;

INSERT INTO department (id, dept_name)
    VALUES
        (01, "Reynoldsburg"),
        (02, "Westerville"),
        (03, "Hilliard");

INSERT INTO role (id, title, salary, department_id)
    VALUES
        (001, "MTL", "Salaried", 01),
        (002, "ATL", "Hourly", 02),
        (003, "ATL", "Hourly", 03),
        (004, "TA", "Commissioned", 01),
        (005, "TA", "Commissioned", 02),
        (006, "TA", "Commissioned", 03);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
        (0001, "Raemarie", "Oatman", 001, 001),
        (0002, "Janelle", "Vagnone", 002, 002),
        (0003, "Thea", "Sheffey", 003, 003),
        (0004, "Angela", "Miller", 004, 001),
        (0005, "Kim", "Duda", 004, 001),
        (0006, "Penelope", "Love", 005, 002),
        (0007, "Pete", "Smart", 005, 002),
        (0008, "Michele", "Hauck", 006, 003),
        (0009, "Dave", "Hulburt", 006, 003);