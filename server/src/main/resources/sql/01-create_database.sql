CREATE USER 'crmdemo'@'localhost' IDENTIFIED BY 'crmdemo';

GRANT ALL PRIVILEGES ON * . * TO 'crmdemo'@'localhost';

CREATE DATABASE  IF NOT EXISTS `crm_database`;
USE `crm_database`;
