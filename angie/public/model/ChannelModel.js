Angie.service('ChannelModel',
  function() {
    this.getChannelsForUser = function(userId) {
      /*
      var user = JSON.parse(window.localStorage.getItem(userId));
      if (!user) {
        return [];
      }
      return user.channels;
      */
    };
    this.getChannels = function() {
      // TODO: GET /channel
      return [
        {
          name: 'bikes',
          ownerId: 'boddi',
          members: []
        },
        {
          name: 'cars',
          ownerId: 'kjartan',
          members: []
       }
      ]
      /*
      if  (window.localStorage.length > 0) {
        var userId = window.localStorage.key(0);
        var user = JSON.parse(window.localStorage.getItem(userId));
        if (!user) {
            return [];
        }
      }else{
        return [];
      }
      return user.channels;
      */
    };
    this.addChannel = function(userId, channelName) {
      // TODO: POST /channel
      /*
      var now = new Date();
      var channel = {
        name: channelName,
        ownerId: userId,
        members: []
      };
      var user = JSON.parse(window.localStorage.getItem(userId));
      if (!user) {
        user = {
          id: userId,
          channels: []
        };
      }
      user.channels.push(channel);
      window.localStorage.setItem(userId, JSON.stringify(user));
      */
    };
    this.deleteChannel = function(userId, channelName) {
      // TODO: DELETE /channel
      /*
      var user = JSON.parse(window.localStorage.getItem(userId));
      if (!user || !user.channels) {
        return;
      }
      for (var i=0; i<user.channels.length; i++) {
        if (user.channels[i].name === channelName) {
          user.channels.splice(i, 1);
          window.localStorage.setItem(userId, JSON.stringify(user));
          return;
        }
        */
      }


    this.addChannelMember = function(channelName, memberId) {
      // Button was pressed
      // TODO: POST /channel/:channelname/join     body: username=memberId

    };
    this.removeChannelMember = function(channelName, memberId) {
      // TODO: DELETE ...
      
    };
  }
);
