var _und = require('underscore');

var validateChannelname = function(channelname) {
	return (/[^a-zA-Z0-9]/.test(channelname));
}

exports.findAll = function(req, res){
  res.send(JSON.stringify( _und.pluck(globals.channelList, "name")));
};

exports.createChannel = function(req, res){
	var channelname = req.body.channelname.toLowerCase();
	var username = req.body.username.toLowerCase();
	var user = _und.where(globals.userList, { id: username });
	if ( user.length === 0 ) {
		res.send('usernamenotfound', 403);
	} else {
		var channel = _und.where(globals.channelList, { name: channelname });
		if ( channel.length > 0 ) {
			res.send('channelexists', 403);
		} else if (validateChannelname(channelname)) {
			res.send('containsnonalphanumeric', 403);
		} else {
			globals.channelList.push({ 
										name: channelname,
										owner: username,
										members: [] 
									});
			res.send("Creating a new channelname: " + channelname + ".");
		}	 
	}
}

exports.updateAllChannels = function(req, res){
	res.send('cantbulkupdate', 403);
}

exports.deleteAllChannels = function(req,res){
	res.send('cantbulkdelete', 403);
}

exports.findByChannelName = function(req, res){
	var channelname = req.params.channelname.toLowerCase();
	var channel = _und.where(globals.channelList, { name: channelname });
	if ( channel.length > 0 ) {
		res.send(channel[0]);
	} else {
		res.send('channelnotfound', 404);
	}
}

exports.createChannelByName = function(req, res){
	res.send("cantcreatechannelbyname", 403);
}

exports.updateChannel = function(req, res){
	res.send("cantupdatechannel", 403)
}

exports.deleteChannel = function(req, res){
	var channelname = req.params.channelname.toLowerCase();
	var channel = _und.where(globals.channelList, { name: channelname });
	if ( channel.length > 0 ) {
		globals.channelList = _und.filter(globals.channelList, function(channel) { return channel.name !== channelname});
		res.send("deleting channelname: " + channelname + ".");	
	} else {
		res.send('channelnotfound', 403);
	}		
}

exports.join = function(req, res) {
	var channelname = req.params.channelname.toLowerCase();
	var username = req.body.username.toLowerCase();
	var user = _und.where(globals.userList, { id: username });
	if ( user.length === 0 ) {
		res.send('usernamenotfound', 403);
	} else{
		var channel = (_und.where(globals.channelList, { name: channelname }))[0]; 
		console.log(channel);
		if (! _und.contains(channel.members, username)) {
			channel.members.push(username);
			res.send('adding user to: ' + channelname + ".");
		} else {
			res.send('allreadyamember', 403);
		}
	}
}

exports.leave = function(req, res) {
	var channelname = req.params.channelname.toLowerCase();
	var username = req.body.username.toLowerCase();
	var user = _und.where(globals.userList, { id: username });
	if ( user.length === 0 ) {
		res.send('usernamenotfound', 403);
	} else{
		var channel = (_und.where(globals.channelList, { name: channelname }))[0]; 
		console.log(channel);
		if (! _und.contains(channel.members, username)) {
			res.send('notamember', 403);
		} else {
			channel.members = _und.without(channel.members, username );
			res.send('removing user from: ' + channelname + ".");
		}
	}
}