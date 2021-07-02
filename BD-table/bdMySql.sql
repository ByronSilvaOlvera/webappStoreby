CREATE DATABASE `storebd`

CREATE TABLE `store` (
	`idstore` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(200) NOT NULL,
	`street` VARCHAR(200) NOT NULL,
	`number` VARCHAR(50) NOT NULL,
	`zip` VARCHAR(100) NOT NULL,
	`code` VARCHAR(20) NOT NULL,
	`city` VARCHAR(200) NOT NULL,
	`country` VARCHAR(200) NOT NULL,
	`idproduct` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`idstore`)
)
COLLATE='utf8_general_ci';

CREATE TABLE `storeproduct` (
    `idprodstore` INT NOT NULL AUTO_INCREMENT,
    `idstore` INT,
    `idproduct` INT,
    PRIMARY KEY(`idprodstore`)
)

ALTER TABLE `store`
	ADD CONSTRAINT `FK_store_product` FOREIGN KEY (`idproduct`) REFERENCES `product` (`idproduct`);

CREATE TABLE `product` (
	`idproduct` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(200) NOT NULL,
	`color` VARCHAR(100) NOT NULL,
	`idcategory` INT NOT NULL DEFAULT 0,
	`size` VARCHAR(100) NOT NULL,
	`price` DECIMAL(10,2) NOT NULL DEFAULT 0,
	`idstore` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`idproduct`)
)
COLLATE='utf8_general_ci'
;


CREATE TABLE `category` (
	`IDCategory` INT NOT NULL,
	`name` VARCHAR(200) NOT NULL DEFAULT '',
	`keywords` VARCHAR(200) NOT NULL DEFAULT '',
	PRIMARY KEY (`IDCategory`)
)
COLLATE='utf8_general_ci'
;