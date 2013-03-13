
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , channel = require('./routes/channel')
  , http = require('http')
  , path = require('path')
  , _und = require('underscore');

var app = express();

globals = {
        userList: [{id: 'kjartan'}, {id: 'gunnar'}],
        channelList: [  {name: 'cars', owner: 'kjartan', members: [] }
                       , {name: 'bikes', owner: 'gunnar', members: [] } 
                     ]
}

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/users', user.findAll);
app.post('/users', user.createUser);
app.put('/users', user.updateAllUsers);
app.delete('/users', user.deleteAllUsers);

app.get('/users/:username', user.findByUserName);
app.post('/users/:username', user.createUserByName);
app.put('/users/:username', user.updateUser);
app.delete('/users/:username', user.deleteUser);

app.get('/channels', channel.findAll);
app.post('/channels', channel.createChannel);
app.put('/channels', channel.updateAllChannels);
app.delete('/channels', channel.deleteAllChannels);

app.get('/channels/:channelname', channel.findByChannelName);
app.post('/channels/:channelname', channel.createChannelByName);
app.put('/channels/:channelname', channel.updateChannel);
app.delete('/channels/:channelname', channel.deleteChannel);

app.post('/channels/:channelname/join', channel.join);
app.post('/channels/:channelname/leave', channel.leave);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
