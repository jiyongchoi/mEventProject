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
	genre varchar(25)
)

CREATE FUNCTION getEvent ()
RETURNS eventType
AS 'SELECT'