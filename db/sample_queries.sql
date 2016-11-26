TRUNCATE TABLE UserInfo;
TRUNCATE TABLE Event;


-- for "blueuser" user
SELECT * from postUser("blueuser", "bluepassword", "Blue", "Man"); -- add blueuser to the UserInfo table
SELECT * from getUser("blueuser", "wrongpassword"); -- look for blueuser with wrong password
SELECT * from getUser("blueuser", "bluepassword"); -- right password for blueuser
SELECT * from getUser("someguy", "bluepassword"); -- should return empty table

-- for "reduser" user
SELECT * from postUser("reduser", "redpassword", "Red", "Man"); -- add blueuser to the UserInfo table
SELECT * from getUser("reduser", "wrongpassword"); -- look for blueuser with wrong password
SELECT * from getUser("reduser", "redpassword"); -- right password for blueuser
SELECT * from getUser("someguy", "redpassword"); -- should return empty table

-- for "redevent" event
SELECT * from createEvent(4000, "redlocation", "reduser", "2017-03-22 00:00:00", "social", NULL, 10, 22);