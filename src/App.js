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

class App extends React.Component {
	
	render() {
		return (  
		<TopNav/>  
		);
	}
}

export default App;

