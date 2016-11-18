CREATE TYPE userType AS (username varchar(25),
	password varchar(16),
	firstname varchar(25),
	surname varchar(25)
);

CREATE FUNCTION getUser (username varchar(25), password varchar(16))
RETURNS userType
AS 'SELECT * 
	FROM appData.UserInfo 
	WHERE appData.UserInfo.username = $1 
	AND appData.UserInfo.password = $2 '
LANGUAGE SQL;