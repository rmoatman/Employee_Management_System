/* Schema for SQL database/table. */
DROP DATABASE IF EXISTS ems_db;

/* Create database */
CREATE DATABASE ems_db;

USE ems_db;

/* Create department table with a primary key */
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),

    PRIMARY KEY (id)
);

/* Create role table with a foreign key */
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,

    title VARCHAR(30),
    /* Change this to DECIMAL (10,2) for project */
    salary VARCHAR(20),
    department_id INT,

    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

/* Create employee table with two foreign keys */
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,

    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES role(id)
);