var mEvent = {};

mEvent.login = function() {
	$("#userloginform").submit(function(e) {
		e.preventDefault();
		var $username = $("#usernamelogin").val();
		var $password = $("#passwordlogin").val();
		$.ajax({
			url: "/user?username="+$username+"&password="+$password,
			type: 'GET',
			success: function result(result) {
				alert(result);
				// window.location.replace("http://stackoverflow.com");
			},
			error: function result(result) {
				alert(result.responseText);
			}
		});
	});
}

mEvent.signUp = function() {
	$("#usersignupform").submit(function (e) {
		e.preventDefault();
		$.ajax({
			url: "/user",
			data: $("#usersignupform").serialize(),
			type: 'POST',
			success: function (result) {
				alert(result);
			}
		})
	})
}


mEvent.init = function() {
	this.login();
	this.signUp();
}

mEvent.init();