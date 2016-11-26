CREATE TYPE userType AS (username varchar(25),
	password varchar(16),
	firstname varchar(25),
	surname varchar(25)
);

CREATE FUNCTION getUser (username varchar(25), 
						 password varchar(16))
RETURNS userType
AS 'SELECT * 
	FROM appData.UserInfo u
	WHERE u.username = $1 
	AND u.password = $2'
LANGUAGE SQL;

CREATE FUNCTION postUser (username varchar(25), 
						  password varchar(16),
						  firstname varchar(25),
						  surname varchar(25))
RETURNS int
AS 'INSERT INTO appData.UserInfo
	VALUES ($1, $2, $3, $4);
	SELECT 0;'
LANGUAGE SQL;


CREATE TYPE eventType AS (
	eventID varchar(25),
	location varchar(25),
	host varchar(25),
	starttime TIMESTAMP,
	genre genreType,
	rating INTEGER,
	min_participants INTEGER,
	max_participants INTEGER	
);

CREATE FUNCTION getEvents ()
RETURNS eventType
AS 'SELECT *
	FROM appData.Event e
	WHERE e.starttime > CURTIME()'
LANGUAGE SQL;

CREATE FUNCTION getEventsByGenre (genre varchar(25))
RETURNS  eventType
AS 'SELECT *
	FROM appData.Event e
	WHERE e.genre = $1'
LANGUAGE SQL;

CREATE FUNCTION getEventsByLocation (location varchar(25))
RETURNS eventType
AS 'SELECT *
	FROM appData.Event e
	WHERE e.location = $1'
LANGUAGE SQL;

CREATE FUNCTION createEvent(eventID varchar(25),
							location varchar(25),
							host varchar(25),
							starttime varchar(25),
							genre varchar(25),
							rating INTEGER,
							min_participants INTEGER,
							max_participants INTEGER)
RETURNS int
AS 'INSERT INTO appData.Event
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	SELECT 0;'
LANGUAGE SQL;

CREATE FUNCTION deleteEvent(eventID varchar(25))
RETURNS int
AS 'DELETE FROM appData.Event
	WHERE eventID = $1;'
LANGUAGE SQL;

CREATE FUNCTION modifyLocationEvent(eventID varchar(25), custom_query varchar(300))
RETURNS int 
AS 'UPDATE appData.Event
	SET ' + '$2
	WHERE eventID = $1;'
LANGUAGE SQL;

