# mEvent

### Link to the website
http://mevent.herokuapp.com/

### Description

#### Login Screen
When the user first loads the website, they are brought to a screen with 2 form fields - one of which being the Login form, and the other being the Sign Up form. The Sign Up form requires a Username, a Password, a First Name, and a Last Name, with appropriate form validation in place to ensure all inputs are valid. Once the Sign Up button at the bottom has been pressed, each of the attributes are saved in a PSQL table, with the Username being the Primary Key. Another attribute that is automatically created is the account type (whether they are admins or not). We have, by default, set all new accounts to be clients by default. All admins on the website are either preexisting or need to be promoted by another Admin through the Admin page. The Sign In form requires a Username and a Password. The form sends the input fields to the server, gets the user information from the database (using the Username as the Primary Key) and checks the passwords against each other. If the information matches up, a session is created. The session ensures that all user info persists throughout their usage of the website. Everytime a new page is loaded, the server checks to ensure that a session exists - this is a security mechanism to make sure that users can only access the pages that they are designed to access, as well as a way to ensure that user data persists throughout their usage of the website. There is also a navigation bar at the top containing a link to the login screen, which exists should a user need to refresh the login screen.

#### Main Page
##### Navigation Bar
Once the user has logged in, there are four main components that they will be able to interact with. The first component is the navigation bar at the top. There are three buttons on the navigation bar: the Home button, the Add Event button, the Admin button, and the Logout button. The Home button simply redirects the user to the Main Page, the Add Event button brings the user to a page where they can create Events, and the Admin button brings the user to a page containing all Administrator functionality. The Admin button only appears if the user's account type is Admin, otherwise it appears as an empty "div". The check is performed with the use of the existing session, and occurs everytime the navigation bar is loaded. This is to ensure that only users with the appropriate permissions can use the Administrator functions. The logout button terminates the current session, and redirects the user to the login screen. As a sanity check, the navigation bar also displays a message with the format: "You are logged in as {user}". This is an easy way for both users and testers to ensure that their current session is intact. The navigation bar appears on every page to ensure that users can access all of the website's features from any page.

##### User Info
On the Main Page, there will also be a simple box containing a link to the User's Userpage, as well as containing the user's First and Last names and their username (once again, a check to ensure the session exists).

##### List Events
The last major feature of the Main Page is the List Events area. Events are also stored in a PSQL table, similarly to how we handled the list of users (more detail in the section covering Event Page). In the List Events area, all events are listed in the order that they are retrieved from the database (in order of EventID). Clicking on the EventID of an event sends you to that event's Event Page. There are also two dropdown buttons at the very top of the List Events area, one of them being a Sort By button, and the other being a Search For button. The Sort By button gives you three options, EventID, Genre, and Name. EventID sorts the events in numeric order, Genre sorts the events by grouping all events with the same genre, and Name sorts the events in alphabetical order. It is important to note that the sorting only occurs within the DOM, and so the database is not accessed during this process. The Search For button gives you the option of every Genre that we have defined while making this website, them being: Sports, Arts, Science, Social, and Other, on top of searching for All events. This works by requesting Events from the table that only have the Genre that is requested. Searching and Sorting are not mutually exclusive: for example - you can search for Sports, and then sort them in alphabetical order.

#### User Page
When the user clicks on the link to their own page in the User Info box, or if they click on another user's link through the Event Pages and Lists, they are brought to their User Page. The User Page contains the same User Info component as Main Page, except that it displays the information for the user they wish to see. Instead of the normal List Events component, there is a variant of it where it shows which events the user is an Attendee for in one section, and which events the user is a Host for in the other. These events are retrieved from the database by performing searches for Attendees and Hosts, respectively.

#### Event Page
When the user clicks on the EventID of an event, they are sent to this page. On this page, the user can see the Event Name, the EventID (which is the Primary Key, and is used to retrieve the event information from the database), the Host, the Location, the Start Time, the Genre, the Minimum number of Participants, and the Maximum number of Participants. This information is all retrieved from the database, and is displayed in a box at the top of the screen. Just below that box, the user can see the Attendee list, where every attendee is displayed in a list. Even further below that, the user can see four boxes. One box tells the user whether the event is at capacity or not. This is done by checking the number of attendees against the Max Attendees number set by the host. Below that, they can see whether or not they are currently on the attendee list. Below that, they can leave a review of the event if they were an attendee and if the event has already occured. Otherwise, the user gets a message saying "You may not leave a review". Lastly, there is a button where the user can sign up to be an attendee for the event. This adds them to the Attendee List in the database.

#### Add Event Page
When the user clicks the Add Event button on the navigation bar, they are brought to the Add Event Page. The page contains a form with the following required input fields: Title, Description, Location, Time, Genre, Min Participants, and Max Participants. Form validation is used in each of these input fields to ensure that only valid input is accepted. In the particular case of Time, the input format used is datetime, and so on certain browsers, a calendar might show up to facilitate their input. In the case of Genre, a predetermined dropdown list of genres (discussed above) is made available to users in order to better categorize the various events. Certification is automatically set to 'false' by default. Only an admin can change Certification through the Edit Event page. An Add Event button is made available at the bottom which submits the contents of the form to the database. Once the button is pressed and the event is created, the user is redirected to the Event Page.

#### Admin Page
If the user is an Admin and clicks on the Admin button on the navigation bar, they are brought to the Admin page. The page contains four collapsible panel elements, meaning that each panel element can be clicked to have its functionality appear on the screen. The panels are: Edit User, Delete User, Edit Event, and Clear Database.

##### Edit User
When the user clicks Edit User in Admin Page, a form drops down (using collapsible) with the input fields Username, Password, First Name, Last Name, and Account Type. Only the Username field is required, since it is the primary key needed to access the user's information. That being said, it is also the only field that you cannot edit - it is inputted in order to be able to change all of the other attributes. The button at the bottom, Edit User Info, is used to confirm changed. Once it is clicked, a Modal popup appears reviewing the information to be modified, and prompting the user to confirm the changes. If an attribute is left blank, it remains unchanged, whereas filled out attributes are modified in the database once the changes are confirmed.

##### Delete User
When the user clicks Delete User in Admin Page, a form drops down with the input field Username. Once the username is inputted, and the button below it is clicked, a Modal popup appears asking the user if they really wish to delete the user. Once this is confirmed, the target is deleted from the database. If the target isn't in the database, no changes are made to the database.

##### Edit Event
When the user clicks Edit Event in Admin Page, a form drops down with the input fields EventID, Title, Description, Certification, Location, Start Time, Genre, Max Participants, Min Participants, and Host. EventID is the only required input field, but since it is the Primary Key, it is also the only field that you cannot edit. Any of the other fields can be edited, and once the Edit Event Info button at the bottom is clicked, a Modal popup appears asking the user to confirm the changes. Once the changes are confirmed, the database is modified to reflect the changes. Attributes that are left blank in the Edit Event form are not modified.

##### Clear Database
When the user clicks Clear Database in Admin page, a Clear Database button drops down. If it is clicked, a Modal popup appears asking if you are sure you want to clear the database. If you click Confirm, all of the tables in the database are truncated, thereby deleting all of the data on the server.

#### Cool Features
Some cool features we implemented were:  
Paramatrizing all inputs to SQL functions to prevent SQL injection  
Used Bootstrap to create a fully Responsive website  
Rating users and events  
Restriciting admin functionality to admins by verifying account type  
Added Event Certification as an admin feature to legitimize certain events  
Data persistence through Sessions  

#### Things We Couldn't Do
Some things we wanted to implement but couldn't due to time constraints were:  
Implementing 3rd party authentication  
Adding profile pictures, event pictures to users and events  
Implementing confirmation of attendendance  
