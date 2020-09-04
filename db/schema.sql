create database burgers_db;

use burgers_db;

create table burgers 
(
    id INT AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(50),
    devoured boolean default false,
    PRIMARY KEY(id)
);

