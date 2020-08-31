create database burgers_db;

use burgers_db;

create table burgers (
    id INT AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(30),
    devoured boolean,
    PRIMARY KEY(id))

