DROP SCHEMA IF EXISTS appData cascade;
CREATE SCHEMA appData;
SET search_path TO appData, public;

CREATE DOMAIN accountDomain varchar(10)
    check (value in ('client', 'admin'));

--Creates a table that stores user info
CREATE TABLE UserInfo (
	username varchar(25) PRIMARY KEY,
	password varchar(16) NOT NULL,
	firstname varchar(25),
	surname varchar(25),
	accountType accountDomain NOT NULL
);

--Defines preset genres to be used throughout the website
CREATE DOMAIN genreType varchar(25)
    check (value in ('sports', 'arts', 'science', 'social', 'other'));

--Creates a table that stores event info
CREATE TABLE Event (
	eventid INTEGER PRIMARY KEY,
	title varchar(100) NOT NULL,
	picture bytea,
	description varchar(1000),
	isCertified boolean NOT NULL,
	location varchar(1000) NOT NULL,
	host varchar(25) REFERENCES UserInfo,
	starttime TIMESTAMP NOT NULL,
	genre appData.genreType NOT NULL,
	rating INTEGER DEFAULT NULL,
	min_participants INTEGER,
	max_participants INTEGER
);

--Creates a table that stores event attendee info
CREATE TABLE EventAttendees (
	eventid INTEGER REFERENCES Event(eventid),
	username varchar(25) REFERENCES UserInfo(username),
	PRIMARY KEY (eventid, username)
);

--Creates a table that stores event reviews
CREATE TABLE Review(
	username varchar(25) REFERENCES UserInfo,
	eventid INTEGER REFERENCES Event,
	reviewtext varchar(1000),
	reviewrating INTEGER,
	PRIMARY KEY (eventid, username)
);