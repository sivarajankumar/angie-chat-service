var _und = require('underscore');



var validateChannelname = function(channelname) {
	return (/[^a-zA-Z0-9]/.test(channelname));
}

exports.findAll = function(req, res){
  // res.send(JSON.stringify( _und.pluck(globals.channelList, "name")));
  res.send(globals.channelList);  // BS:  Ég þarf að fá lista af objectum með amk: name og owner.

};

exports.createChannel = function(req, res){
	var channelname = req.body.channelname;
	var username = req.body.username;
	var user = _und.where(globals.userList, { id: username });
	console.log("--------------");
	console.log(globals.userList);
	if ( user.length === 0 ) {
		res.send('usernamenotfound', 403);
	} else {
		var channel = _und.where(globals.channelList, { name: channelname });
		if ( channel.length > 0 ) {
			res.send('channelexists', 403);
		// } else if (validateChannelname(channelname)) {
		// 	res.send('containsnonalphanumeric', 403);
		} else {
			globals.channelList.push({ 
										name: channelname,
										owner: username,
										members: [],
										messages: [] 
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
	var channelname = req.params.channelname;
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
	var channelname = req.params.channelname;
	var channel = _und.where(globals.channelList, { name: channelname });
	if ( channel.length > 0 ) {
		globals.channelList = _und.filter(globals.channelList, function(channel) { return channel.name !== channelname});
		res.send("deleting channelname: " + channelname + ".");	
	} else {
		res.send('channelnotfound', 404);
	}		
}

exports.join = function(req, res) {
	var channelname = req.params.channelname;
	var username = req.body.username;
	var user = _und.where(globals.userList, { id: username });
	if ( user.length === 0 ) {
		res.send('usernamenotfound', 404);
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
	var channelname = req.params.channelname;
	var username = req.body.username;
	var user = _und.where(globals.userList, { id: username });
	if ( user.length === 0 ) {
		res.send('usernamenotfound', 404);
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

exports.addMessage = function(req, res) {
	var channelname = req.params.channelname;
	var username = req.body.username;
	var message = req.body.message;
	var user = _und.where(globals.userList, { id: username });
	if ( user.length === 0 ) {
		res.send('usernamenotfound', 404);
	} else{
		var channel = (_und.where(globals.channelList, { name: channelname }))[0]; 
		if (! _und.contains(channel.members, username)) {
			res.send('notamember', 403);
		} else {
			channel.messages.push({
									poster: username,
									message: message
								  });
			res.send(username + " wrote: " + message + " on: " + channelname);
		}
	}
}

exports.listMessages = function(req, res) {
	var channelname = req.params.channelname;
	var channel = (_und.where(globals.channelList, { name: channelname }))[0];
	if (channel !== undefined) {
		res.send(JSON.stringify(channel.messages));
	} else {
		res.send('channelnotfound', 404);
	}
}

exports.streamMessages = function(req, res) {
	var channelname = req.params.channelname;
	req.socket.setTimeout(Infinity);

	res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');

    globals.openConnections.push(res);

    req.on("close", function() {
    	var toRemove = -1;
    	for ( var i = 0; globals.openConnections.length; i++) {
    		if ( globals.openConnections[i] == res) {
    			toRemove = i;
    			break;
    		}
    	}
    	if (toRemove > -1){
    	    globals.openConnections.splice(i,1);
        }
    	console.log(globals.openConnections.length);
    });

    setInterval(function() {
	    // we walk through each connection
	    globals.openConnections.forEach(function(resp) {
	        var d = new Date();
	        resp.write('id: ' + d.getMilliseconds() + '\n');
	        resp.write('data:' + createMsg() +   '\n\n'); // Note the extra newline
	    });
 
	}, 1000);

	function createMsg() {

		var channel = (_und.where(globals.channelList, { name: channelname }))[0];
		var messages = channel.messages;
		var members = channel.members;
		var owner = channel.owner;

	    msg = {};
	    msg.message = messages;
	    msg.members = members;
	    msg.channelname = channelname;
	    msg.owner = owner;
	 
	    return JSON.stringify(msg);
	}
}


 
