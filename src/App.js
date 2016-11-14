import React from 'react';

class TopNav extends React.Component{
	render(){
		return(
			<ul id="TopNavBar">
				<li><a href="#root">Home</a></li>
          		<li>Login</li>
          	</ul>
		);
	}
}

class LoginForm extends React.Component{
	render(){
		return (
			<div class="login" id="userlogin">
				<h3>LOG IN!!!!!!!!!!!!!!!!!!!!</h3>
        		<form id="userloginform" method="get">
		            <label>
		                <span>Username: </span>
		                <input type="text" id="usernamelogin" name="username" placeholder="e.g. bluejayfan1000" 
		                pattern="[A-Za-z]+" required></input>
		            </label> <br></br>
		            <label>
		                <span>Password: </span>
		                <input type="text" id="passwordlogin" name="password" placeholder="e.g. bluejayfan1000" 
		                pattern="[A-Za-z]+" required></input>
		            </label> <br></br>            
		            <input class="submitbutton" id="statusButton" type="submit" value="Submit"></input>
		        </form>
			</div>
		);
	}
}

class App extends React.Component {
	
	render() {
		return (
			<div>
				<TopNav/>
				<LoginForm/>
			</div>
		);
	}
}

export default App;

