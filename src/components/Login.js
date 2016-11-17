// src/components/Login.js

import React from 'react';
import axios from 'axios';


export default class LoginForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value: null
		};
	}

submit(e){


	  e.preventDefault();


	  // Submit form via jQuery/AJAX
		axios.get('/user')
		      	.then(function (response) {
		      		console.log(response.data.data);
		  });

	}



	render(){
		// let data1 = '';
		// axios.get('/user')
		//       	.then(function (response) {
		//       		console.log(response.data.data);
		//       		data1 = response.data.data;
		//       		console.log("data: " + data1);
		//   });
		// console.log(data1);

		// console.log("asdfasdfasdfasd");
		// console.log("asdfasdfsad");
		return (
			<div class="login" >
				<h3>LOGGING IN!!!!!!!!!!!!!!!!!!!!</h3>
        		<form id="userloginform" method="get" onSubmit={this.submit}>
		            <label>
		                <span>Username: </span>
		                <input type="text" id="usernamelogin" name="username" placeholder="e.g. jayfan1000" 
		                pattern="[A-Za-z]+" required></input>
		            </label> <br></br>
		            <label>
		                <span>Password: </span>
		                <input type="text" id="passwordlogin" name="password" placeholder="e.g. bluejayfan1000" 
		                pattern="[A-Za-z]+" required></input>
		            </label> <br></br>            
		            <input class="submitbutton" id="statusButton" type="submit" value="Submit"></input>
		        </form>
		        <div>{"asdasdf"}</div>
			</div>
		);
	}
}