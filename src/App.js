import React from 'react';

class TopNav extends React.Component{
	render(){
		return(
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">mEvent</a>
					</div>
					<ul className="nav navbar-nav" id="TopNavBar">
						<li><a href="#root">Home</a></li>
		          		<li><a href="#">Login</a></li>
		          	</ul>
	          	</div>
          	</nav>
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

class SignInForm extends React.Component{
	render(){
		return (
			<div class="signup" id="usersignup">
				<h3>SIGN UP!!!!!!!!!!!!!!!!!!</h3>
		        <form id="usersignupform" method="post">
		            <label>
		                <span>Username: </span>
		                <input type="text" id="usernamesignup" name="username" placeholder="e.g. bluejayfan1000" 
		                pattern="[A-Za-z]+" required></input>
		            </label> <br/>
		            <label>
		                <span>Password: </span>
		                <input type="text" id="passwordsignup" name="password" 
		                pattern="[A-Za-z]+" required></input>
		            </label> <br/>  
		            <label>
		                <span>First Name: </span>
		                <input type="text" id="firstnamesignup" name="firstname" placeholder="e.g. John" 
		                pattern="[A-Za-z]+" required></input>
		            </label> <br/>  
		            <label>
		                <span>Surname: </span>
		                <input type="text" id="surnamesignup" name="surname" placeholder="e.g. Hong" 
		                pattern="[A-Za-z]+" required></input>
		            </label> <br/>                        
		            <input class="submitbutton" id="statusButton" type="submit" value="Submit"/>
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
				<SignInForm/>
			</div>
		);
	}
}

export default App;

