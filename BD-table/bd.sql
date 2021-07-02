

CREATE DATABASE storebd; 


CREATE TABLE Store (
	idStore SERIAL PRIMARY KEY not null,
    name varchar(200) not null,
	street varchar(200) not null, 
	number int,
	zip varchar(100),
   	code varchar(20),
	city varchar(100),
	country varchar(100),
	--idproduct int,

); 

CREATE TABLE Category (
    idCategory SERIAL PRIMARY KEY,
	name varchar(200),
	keywords varchar(200),
	
); 

CREATE TABLE Product (
    idProduct SERIAL PRIMARY KEY not null,
	name varchar(200) not null,
	color varchar(100) not null,
	idcategory int not null,
	size varchar(200) not null,
	price decimal(10,2),
	--stores varchar(200),
	
	
); 

ALTER TABLE Product	
ADD CONSTRAINT productcategory
FOREIGN KEY (idcategory) REFERENCES Category(idCategory)


CREATE TABLE storeProduct (
	idstoreproduct SERIAL PRIMARY KEY NOT NULL,
	idstore int,
	idproduct int,
)

ALTER TABLE storeProduct	
ADD CONSTRAINT unione
FOREIGN KEY (idstore) REFERENCES Store(idStore)

ALTER TABLE storeProduct	
ADD CONSTRAINT unitwo
FOREIGN KEY (idproduct) REFERENCES Product(idProduct)







ALTER TABLE Product	
ADD CONSTRAINT uni
FOREIGN KEY (idcategory) REFERENCES Category(idCategory)