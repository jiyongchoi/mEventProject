DROP SCHEMA IF EXISTS appData cascade;
CREATE SCHEMA appData;
SET search_path TO appData, public;

CREATE TABLE UserInfo (
	username varchar(25) PRIMARY KEY,
	password varchar(16),
	firstname varchar(25),
	surname varchar(25)
);

CREATE TABLE Event (
	eventID INTEGER PRIMARY KEY,
	location varchar(25),
	host varchar(25) REFERENCES UserInfo,
	starttime DATETIME,
	genre varchar(25)
)