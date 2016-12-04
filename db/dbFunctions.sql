SET search_path TO appData, public;

CREATE TYPE userType AS (username varchar(25),
	password varchar(16),
	firstname varchar(25),
	surname varchar(25),
	accountType appData.accountDomain
);

CREATE FUNCTION getUser (username varchar(25), 
						 password varchar(16))
RETURNS userType
AS 'SELECT * 
	FROM appData.UserInfo u
	WHERE u.username = $1 
	AND u.password = $2;'
LANGUAGE SQL;


CREATE TYPE userInfoType AS (username varchar(25),
	firstname varchar(25),
	surname varchar(25),
	accountType appData.accountDomain
);

CREATE FUNCTION getUserInfo(username varchar(25))
RETURNS userInfoType
AS 'SELECT username, firstname, surname, accountType 
	FROM appData.UserInfo u
	WHERE u.username = $1;'
LANGUAGE SQL;


CREATE FUNCTION postUser (username varchar(25), 
						  password varchar(16),
						  firstname varchar(25),
						  surname varchar(25),
						  accountType appData.accountDomain)
RETURNS int
AS 'INSERT INTO appData.UserInfo
	VALUES ($1, $2, $3, $4, $5);
	SELECT 0;'
LANGUAGE SQL;

CREATE FUNCTION editUser (username varchar(25),
						  password varchar(16),
						  firstname varchar(25),
						  surname varchar(25),
						  accountType varchar(10))
RETURNS userType
AS 'WITH myUser AS (
        SELECT *
        FROM appData.UserInfo
        WHERE username = $1
     )
	UPDATE appData.UserInfo SET 
		password = CASE WHEN $2 = '''' 
		THEN (SELECT password From myUser) 
		ELSE $2 END, 
		firstname = CASE WHEN $3 = '''' 
		THEN (SELECT firstname From myUser) 
		ELSE $3 END,
		surname = CASE WHEN $4 = '''' 
		THEN (SELECT surname From myUser) 
		ELSE $4 END, 
		accountType = CASE WHEN $5 = '''' 
		THEN (SELECT accountType From myUser) 
		ELSE $5 END 
		WHERE username = $1;
	SELECT * FROM appData.UserInfo WHERE username = $1;'
LANGUAGE SQL;

CREATE FUNCTION deleteUser (username varchar(25))
RETURNS int
AS 'DELETE 
	FROM appData.UserInfo
	WHERE username = $1;
	SELECT 0;'
LANGUAGE SQL;

CREATE TYPE eventType AS (
	eventid INTEGER,
	title varchar(100),
	picture bytea,
	description varchar(1000),
	isCertified boolean,
	location varchar(1000),
	host varchar(25),
	starttime TIMESTAMP,
	genre appData.genreType,
	rating INTEGER,
	min_participants INTEGER,
	max_participants INTEGER	
);

CREATE TYPE userEventType AS (
	eventid INTEGER,
	title varchar(100),
	picture bytea,
	description varchar(1000),
	isCertified boolean,
	location varchar(1000),
	host varchar(25),
	starttime TIMESTAMP,
	genre appData.genreType,
	rating INTEGER,
	min_participants INTEGER,
	max_participants INTEGER,
	username varchar(25)
);

CREATE FUNCTION getEvents ()
RETURNS SETOF eventType
AS 'SELECT *
	FROM appData.Event e
	WHERE e.starttime > clock_timestamp();'
LANGUAGE SQL;

CREATE FUNCTION getEventsAll(username varchar(25))
RETURNS SETOF userEventType
AS 'SELECT 
		event.eventid,
		title,
		picture,
		description,
		isCertified,
		location,
		host,
		starttime,
		genre,
		rating,
		min_participants,
		max_participants,
		username
	FROM appData.Event event JOIN appData.EventAttendees eventattendees
	ON event.eventid = eventattendees.eventid
	WHERE username=$1;'
LANGUAGE SQL;

CREATE TYPE verifyType AS (
	eventid INTEGER
);
CREATE FUNCTION verifyAttendance(username varchar(25), eventid INTEGER)
RETURNS verifyType
AS 'SELECT event.eventid
	FROM appData.Event event JOIN appData.EventAttendees eventattendees
	ON event.eventid = eventattendees.eventid
	WHERE starttime < clock_timestamp() AND event.eventid = $2 AND username = $1;'
LANGUAGE SQL;

CREATE FUNCTION eventHappened(eventid INTEGER) 
RETURNS int
AS 'SELECT eventid
	FROM appData.Event
	WHERE starttime < clock_timestamp() AND eventid = $1;'
LANGUAGE SQL;

CREATE FUNCTION getEventsByGenre (genre varchar(25))
RETURNS SETOF eventType
AS 'SELECT *
	FROM appData.Event e
	WHERE e.genre = $1 AND e.starttime > clock_timestamp();'
LANGUAGE SQL;

CREATE FUNCTION getEventInfo (eventid INTEGER) 
RETURNS eventType
AS 'SELECT *
	FROM appData.Event e
	WHERE e.eventid = $1;'
LANGUAGE SQL;

CREATE FUNCTION getEventsByLocation (location varchar(1000))
RETURNS SETOF eventType
AS 'SELECT *
	FROM appData.Event e
	WHERE e.location = $1 AND e.starttime > clock_timestamp();'
LANGUAGE SQL;

CREATE FUNCTION getEventsByHost(username varchar(25)) 
RETURNS SETOF eventType
AS 'SELECT *
	FROM appData.Event e
	WHERE e.host = $1;'
LANGUAGE SQL;

CREATE FUNCTION createEvent(
	eventid INTEGER,
	title varchar(100),
	picture bytea,
	description varchar(1000),
	isCertified boolean,
	location varchar(1000),
	host varchar(25),
	starttime TIMESTAMP,
	genre genreType,
	rating INTEGER,
	min_participants INTEGER,
	max_participants INTEGER)
RETURNS int
AS 'INSERT INTO appData.Event
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
	SELECT 0;'
LANGUAGE SQL;

CREATE FUNCTION editEvent (eventid INTEGER,
						   title varchar(100),
						   description varchar(1000),
						   isCertified boolean,
						   location varchar(1000),
						   host varchar(25),
						   starttime TIMESTAMP,
						   genre genreType,
						   min_participants INTEGER,
						   max_participants INTEGER)
RETURNS eventType
AS 'WITH myEvent AS (
        SELECT *
        FROM appData.Event
        WHERE eventid = $1
     )
	UPDATE appData.Event SET 
		title = CASE WHEN $2 = '''' 
		THEN (SELECT title From myEvent) 
		ELSE $2 END,
		description = CASE WHEN $3 = '''' 
		THEN (SELECT description From myEvent) 
		ELSE $3 END, 
		isCertified = $4,
		location = CASE WHEN $5 = '''' 
		THEN (SELECT location From myEvent) 
		ELSE $5 END,  
		host = CASE WHEN $6 = '''' 
		THEN (SELECT host From myEvent) 
		ELSE $6 END,
		starttime = $7,  
		genre = CASE WHEN $8 = '''' 
		THEN (SELECT genre From myEvent) 
		ELSE $8 END,
		min_participants = $9,
		max_participants = $10
		WHERE eventid = $1;
	SELECT * FROM appData.Event WHERE eventid = $1;'
LANGUAGE SQL;

CREATE FUNCTION deleteEvent(eventid INTEGER)
RETURNS int
AS 'DELETE FROM appData.Event
	WHERE eventid = $1;
	SELECT 0;'
LANGUAGE SQL;

CREATE FUNCTION getMaxEventID ()
RETURNS int
AS 'SELECT max(eventid)+1
	FROM appData.Event;'
LANGUAGE SQL;

CREATE FUNCTION addReview(
	username varchar(25),
	eventid INTEGER,
	reviewText varchar(1000),
	rating INTEGER)
RETURNS int
AS 'INSERT INTO appData.Review
	VALUES ($1, $2, $3, $4);
	SELECT 0;'
LANGUAGE SQL;

CREATE TYPE 
CREATE FUNCTION alreadyAttendee(
				eventid INTEGER,
				username varchar(25))
RETURNS int
AS 'SELECT eventid
	FROM appData.EventAttendees
	WHERE eventid=$1 AND username=$2;'
LANGUAGE SQL;

CREATE FUNCTION signupEventUser(
				eventid INTEGER,
				username varchar(25))
RETURNS int
AS 'INSERT INTO appData.EventAttendees
	VALUES ($1, $2);
	SELECT 0;'
LANGUAGE SQL;

CREATE TYPE EnrolNumType AS (
	eventid INTEGER,
	enrolmentnum bigint
);


CREATE FUNCTION findCurrentEnrolNum(eventid INTEGER)
RETURNS EnrolNumType
AS 'SELECT eventid, count(username) as enrolmentnum
	FROM appData.EventAttendees
	WHERE eventid = $1
	GROUP BY eventid;'
LANGUAGE SQL;