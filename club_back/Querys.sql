use dbase;


CREATE TABLE OWNERS (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
user_id VARCHAR(11),
habilited char(3) default 'Sim',
created_at timestamp,
updated_at timestamp,
CONSTRAINT fk_userowner FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ASSOCIATES (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
user_id VARCHAR(11),
habilited char(3) default 'Sim',
created_at timestamp,
updated_at timestamp,
CONSTRAINT fk_userassociate FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE CATEGORIEBUSINESSES(
id INTEGER PRIMARY KEY,
dsc varchar(45) not null,
created_at timestamp,
updated_at timestamp
);

CREATE TABLE BUSINESSES (
id INTEGER PRIMARY KEY auto_increment,
categorie_id INTEGER NOT NULL,
owners_id INTEGER NOT NULL,
logo VARCHAR (45) NOT NULL,
habilited CHAR (3) default 'Sim',
name VARCHAR(55) UNIQUE NOT NULL,
created_at timestamp,
updated_at timestamp,
CONSTRAINT fk_businessescat FOREIGN KEY (categorie_id) REFERENCES CATEGORIEBUSINESSES (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_businessesowners FOREIGN KEY (owners_id) REFERENCES Owners (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ADVERTS (
id INTEGER PRIMARY KEY auto_increment,
business_id INTEGER NOT NULL,
dsc VARCHAR (45) NUll,
vl_or DOUBLE NULL,
vl_desc DOUBLE NULL,
created_at timestamp,
updated_at timestamp,
CONSTRAINT fk_advertsbusiness FOREIGN KEY (business_id) REFERENCES BUSINESSES (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE AUTHORIZATIONS (
id VARCHAR (45) PRIMARY KEY,
associates_id INTEGER NOT NULL,
advert_id INTEGER NOT NULL,
created_at timestamp,
updated_at timestamp,
tm_val timestamp,
CONSTRAINT fk_authorizationassociate FOREIGN KEY (associates_id) REFERENCES ASSOCIATES (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_authorizationadvert FOREIGN KEY (advert_id) REFERENCES ADVERTS (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE PHOTOADVERTS (
id INTEGER PRIMARY KEY auto_increment,
name VARCHAR (45) NOT NULL,
adverts_id INTEGER NOT NULL,
created_at timestamp,
updated_at timestamp,
CONSTRAINT fk_photoadvert FOREIGN KEY (adverts_id) REFERENCES ADVERTS (id) ON DELETE CASCADE ON UPDATE CASCADE
);