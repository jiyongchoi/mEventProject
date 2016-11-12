DROP SCHEMA IF EXISTS appData cascade;
CREATE SCHEMA appData;
SET search_path TO appData, public;

CREATE TABLE User (
	username varchar(25) PRIMARY KEY,
	password varchar(16),
	firstname varchar(25),
	surname varchar(25)
);

