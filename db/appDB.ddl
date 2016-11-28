DROP SCHEMA IF EXISTS appData cascade;
CREATE SCHEMA appData;
SET search_path TO appData, public;

CREATE DOMAIN accountDomain varchar(10)
    check (value in ('client', 'admin'));

CREATE TABLE UserInfo (
	username varchar(25) PRIMARY KEY,
	password varchar(16) NOT NULL,
	firstname varchar(25),
	surname varchar(25),
	accountType accountDomain NOT NULL
);

CREATE DOMAIN genreType varchar(25)
    check (value in ('sports', 'arts', 'science', 'social', 'other'));

CREATE TABLE Event (
	eventID INTEGER PRIMARY KEY,
	location varchar(25) NOT NULL,
	host varchar(25) REFERENCES UserInfo,
	starttime TIMESTAMP NOT NULL,
	genre genreType NOT NULL,
	rating INTEGER DEFAULT NULL,
	min_participants INTEGER,
	max_participants INTEGER
);

CREATE TABLE EventAttendees (
	eventID INTEGER REFERENCES Event(eventID),
	username varchar(25) REFERENCES UserInfo(username)
);

