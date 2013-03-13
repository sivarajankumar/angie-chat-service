var _und = require('underscore');

var validateUsername = function(username) {
	return (/[^a-zA-Z0-9]/.test(username));
}

exports.findAll = function(req, res){
  res.send(JSON.stringify(globals.userList));
};

exports.createUser = function(req, res){
	// var username = req.body.username.toLowerCase();
	var username = req.body.username;
	var user = _und.where(globals.userList, { id: username });
	if ( user.length > 0 ) {
		res.send('userexists', 403);
	// } else if (validateUsername(username)) {
	// 	res.send('containsnonalphanumeric', 403);
	} else {
		globals.userList.push({ 
								id: username
							  });
		res.send("Creating a new username: " + username + ".");
	}	 
}

exports.updateAllUsers = function(req, res){
	res.send('cantbulkupdate', 403);
}

exports.deleteAllUsers = function(req,res){
	res.send('cantbulkdelete', 403);
}

exports.findByUserName = function(req, res){
	var username = req.params.username.toLowerCase();
	var user = _und.where(globals.userList, { id: username });
	if ( user.length > 0 ) {
		res.send(username);
	} else {
		res.send('usernotfound', 404);
	}
}

exports.createUserByName = function(req, res){
	res.send("cantcreateuserbyname", 403);
}

exports.updateUser = function(req, res){
	res.send("cantupdateuser", 403);	
}

exports.deleteUser = function(req, res){
	var username = req.params.username;
	var user = _und.where(globals.userList, { id: username });
	if ( user.length > 0 ) {
		globals.userList = _und.reject(globals.userList, function(user) { return user.id === username; });
		res.send("deleting username: " + username + ".");
	} else {
		res.send('usernotfound', 403);
	}	
}